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
import { useParams } from 'react-router-dom'

export default function Question() {
  const [values, setValues] = useState({});
  const [tasks, setTasks] = useState([]);
  const toast = useToast();
  const { id } = useParams();

  const handleValue = (questionId, selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);

    // Construct the data object
    const quizResult = tasks.map((result) => ({
      question_id: result.id,
      selected_option: parseInt(values[result.id]) || null
    }));

    try {
      const res = await fetch('http://localhost:3003/quizresult', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ test: quizResult })
      });

      if (!res.ok) {
        toast({
          title: 'Failed to submit quiz data.',
          description: 'You have not submitted.',
          duration: 10000,
          isClosable: true,
          position: 'top',
          status: 'error',
          icon: <UnlockIcon />
        });

        throw new Error('Failed to submit quiz data');
      }

      toast({
        title: 'Quiz submitted successfully.',
        description: 'You have successfully submitted.',
        duration: 10000,
        isClosable: true,
        position: 'top',
        status: 'success',
        icon: <UnlockIcon />
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
        console.log(data);
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
        <form method="post" onSubmit={handleSubmit}>
          {tasks.map((result) => (
            <SimpleGrid spacing={10} minChildWidth={300} key={result.id}>
              <FormControl mt="20px">
                <FormLabel>
                  <QuestionIcon /> {result.question}:
                </FormLabel>
                <RadioGroup
                  onChange={(selectedOption) => handleValue(result.id, selectedOption)}
                  mb="20px"
                  p="3.5"
                  value={values[result.id] || ''}
                >
                  <Stack>
                    <Radio value="1">{result.option1}</Radio>
                    <Radio value="2">{result.option2}</Radio>
                    <Radio value="3">{result.option3}</Radio>
                    <Radio value="4">{result.option4}</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </SimpleGrid>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
}
