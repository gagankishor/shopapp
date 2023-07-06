import { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, FormHelperText,  Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

export default function Create() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const editor = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('https://blog1-br26.onrender.com/api/users/items', {
        method: 'POST',
        body: JSON.stringify({ title, image, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to create a blog');
      }

      console.log('Blog added successfully');
      // Perform any additional actions after successful creation
      navigate('/'); // Navigate to the desired route on success
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <Box maxW="480px">
      <Heading>Create Blog</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb="40px">
          <FormLabel>Blog Name:</FormLabel>
          <Input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormHelperText>Enter a descriptive Blog name.</FormHelperText>
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Blog Image URL</FormLabel>
          <Input
            type="text"
            placeholder="Enter Blog Image URL..."
            name="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormControl>

        <FormControl mb="40px">
          <FormLabel>Blog description:</FormLabel>
          <JoditEditor
            ref={editor}
            value={description}
            onChange={(e) => setDescription(e)}
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}




