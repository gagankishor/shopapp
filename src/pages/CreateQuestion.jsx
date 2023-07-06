import { 
  Box, 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  Input, 
  Textarea, 
  Button, 
  Heading
} from '@chakra-ui/react'
import { Form, redirect } from 'react-router-dom'

export default function CreateQuestion() {

  return (
    <Box maxW="480px">
      <Heading>Create Quiz</Heading>
      <Form method="post" action="/create">
        <FormControl isRequired mb="40px">
          <FormLabel>Quiz name:</FormLabel>
          <Input type="text" name="title" />
          <FormHelperText>Enter a descriptive task name.</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Quiz Expiry Date:</FormLabel>
          < Input 
            type='text'
            placeholder="Enter Expiry Date for your Quiz..." 
            name="expiry"
          />
        </FormControl>
        <FormControl mb="40px">
          <FormLabel>Quiz description:</FormLabel>
          <Textarea 
            placeholder="Enter a detailed description for your Quiz..." 
            name="description"
          />
        </FormControl>



        <Button type="submit">submit</Button>
      </Form>
    </Box>
  )
}

export const createAction = async ({ request }) => {
  const data = await request.formData()

  const task = {
    title: data.get('title'),
    description: data.get('description'),
    isPriority: data.get('isPriority') === ''
  }

  console.log(task)

  return redirect('/')
}

