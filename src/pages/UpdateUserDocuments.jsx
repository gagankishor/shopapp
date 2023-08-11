import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

const UpdateUserDocuments = () => {
  const toast = useToast();

  const [aadharFront, setAadharFront] = useState('');
  const [aadharBack, setAadharBack] = useState('');
  const [panCard, setPanCard] = useState('');
  const [userId , setUserId] = useState('');
  useEffect(() => {
    // Get the token from local storage or wherever you store it
    const token = localStorage.getItem('token'); // Replace with your actual token retrieval logic
  
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      console.log('User ID from token:', userId);
      // You can use userId in your API calls or other parts of your component
    }
  }, [userId]); 
  const handleUpdateDocuments = async () => {
    const formData = new FormData();
    formData.append('aadhar_front', aadharFront);
    formData.append('aadhar_back', aadharBack);
    formData.append('pan_card', panCard);

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/documents`, formData);
      toast({
        title: 'Documents Updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating documents:', error);
      toast({
        title: 'Error Updating Documents',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Update User Documents
      </Heading>
      <FormControl mb={4}>
        <FormLabel>Aadhar Front</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setAadharFront(e.target.files[0])}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Aadhar Back</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setAadharBack(e.target.files[0])}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>PAN Card</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setPanCard(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleUpdateDocuments}>
        Update Documents
      </Button>
    </Box>
  );
};

export default UpdateUserDocuments;
