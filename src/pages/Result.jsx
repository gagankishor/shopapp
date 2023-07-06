import { QuestionIcon, UnlockIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  Heading,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Form, redirect, useParams } from 'react-router-dom'

export default function Question() {
  const [value, setValue] = useState()
  const [tasks, setTasks] = useState([]);
  const toast = useToast();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =  localStorage.getItem('token');
    console.log(token)

    // Construct the data object
    const quizResult = tasks.map(result => ({
      question_id: result.id,
      selected_option: value === result.id ? value : null
    }));

    try {
      const res = await fetch('http://localhost:3003/quizresult', {
        method: 'POST',
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ test: quizResult })
        
      });

      if (!res.ok) {
        toast({
          title: 'Failed to submit quiz data.',
          description: 'You have Not  Sumited.',
          duration: 10000,
          isClosable: true,
          position: 'top',
          status: 'error',
          icon: <UnlockIcon />,
        });

        throw new Error('Failed to submit quiz data');
      }
      toast({
        title: 'Quiz Sumited successfully.',
        description: 'You have successfully Sumited.',
        duration: 10000,
        isClosable: true,
        position: 'top',
        status: 'success',
        icon: <UnlockIcon />,
      });

      console.log('Quiz data submitted successfully');
      // Perform any necessary actions upon successful submission
      // For example, redirect to a success page
    } catch (error) {
      console.error('Error submitting quiz data:', error);
      // Handle error scenarios
    }
  };

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await fetch('http://localhost:3003/question/quiz/' + id);
        if (!res.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await res.json();
        console.log(data)
        setTasks(data.results);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuestionData();
  }, [id]);

  return (
    <>
      <Heading>Quiz Questions</Heading>
      <Box maxW="480px">
        {/* <Form method="post" onSubmit={handleSubmit}>
          {tasks.map(results => (

          <SimpleGrid spacing={10} minChildWidth={300}>
            <FormControl mt="20px" key={results.id}>
              <FormLabel>
                <QuestionIcon /> {results.question}:
              </FormLabel>
              <RadioGroup  onChange={(selected_option) => setValue(selected_option)} mb="20px" p="3.5" value={value}>
                <Stack>
                  <Radio id={results.id} value='2'>{results.option2}</Radio>
                  <Radio value='3'>{results.option3}</Radio>
                  <Radio value='1'>{results.option1}</Radio>
                  <Radio value='4'>{results.option4}</Radio>
                </Stack>
              </RadioGroup>

            </FormControl>
          </SimpleGrid>
          ))}
          <Button type="submit">Submit</Button>
        </Form> */}


<Form method="post" onSubmit={handleSubmit}>
  {tasks.map((results) => (
    <SimpleGrid spacing={10} minChildWidth={300} key={results.id}>
      <FormControl mt="20px">
        <FormLabel>
          <QuestionIcon /> {results.question}:
        </FormLabel>
        <RadioGroup
          onChange={(selected_option) => setValue(selected_option)}
          mb="20px"
          p="3.5"
          value={value}
        >
          <Stack>
            <Radio  value="results.id+1">{results.option1}</Radio>
            <Radio  value="results.id+2">{results.option2}</Radio>
            <Radio  value="results.id+3">{results.option3}</Radio>
            <Radio value="results.id+4">{results.option4}</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </SimpleGrid>
  ))}
  <Button type="submit">Submit</Button>
</Form>

      </Box>
      </>
  )
}

export const QuestionAction = async ({ request }) => {
  const data = await request.formData()

  const task = {
    title: data.get('title'),
    description: data.get('description'),
    isPriority: data.get('isPriority') === ''
  }

  console.log(task)

  return redirect('/')
}
