import { useState, useEffect } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, FormHelperText, Textarea, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function Edit() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
useEffect(() => {
  axios.get(`https://blog1-br26.onrender.com/api/users/items/${id}`)
    .then((response) => {
      const data = response.data;
      setTitle(data.results.title);
      setImage(data.results.image);
      setDescription(data.results.description);
    })
    .catch((error) => {
      console.error('Error fetching blog details:', error);
    });
}, [id]);
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`https://blog1-br26.onrender.com/api/users/items/${id}`, {
      title,
      image,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to update the blog');
    }
    console.log('Blog updated successfully');
    navigate('/');
  } catch (error) {
    console.error('Error updating blog:', error);
  }
};
return (
    <Box maxW="480px">
      <Heading>Edit Blog</Heading>
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
          <Textarea
            placeholder="Enter a detailed description for your Blog..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
