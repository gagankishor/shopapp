import { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, FormHelperText,  Button, Flex, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

export default function Create() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const editor = useRef(null);
  const [isLoading, setLoading] = useState(false); // Add isLoading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
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
      setLoading(false);
      console.log('Blog added successfully');
      // Perform any additional actions after successful creation
      navigate('/'); // Navigate to the desired route on success
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );  }

    return (
      <Flex mt={-100} align="center" justify="center" height="100vh">
        <Box maxW="480px" p={4}>
          <Heading textAlign="center" mb={4}>
            Create Blog
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel>Blog Name:</FormLabel>
              <Input
                type="text"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText>Enter a descriptive Blog name.</FormHelperText>
            </FormControl>
    
            <FormControl mb={4}>
              <FormLabel>Blog Image URL</FormLabel>
              <Input
                type="text"
                placeholder="Enter Blog Image URL..."
                name="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
    
            <FormControl mb={4}>
              <FormLabel>Blog Description:</FormLabel>
              <JoditEditor
                ref={editor}
                value={description}
                onChange={(e) => setDescription(e)}
              />
            </FormControl>
    
            <Button type="submit" colorScheme="blackAlpha" isFullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    );
    
}




