import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, FormControl, FormLabel, Input, Button, useToast, Flex, Box, Text } from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();   

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        phone_no: phone,
        password,
      });

      if (response.data.success) {
        toast({
          title: 'Registration successful.',
          description: 'You have successfully registered.',
          duration: 10000,
          isClosable: true,
          position: 'top',
          status: 'success',
        });
        navigate('/login'); // Redirect to the login page after successful registration
      }
    } catch (error) {
      setError('Failed to register. Please check your details.');
    }
  };

  return (
    <Flex align="center" mt={-100} justify="center" height="100vh">
      <Box textAlign="center" maxWidth={400} p={8} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading>Register</Heading>
        <form onSubmit={handleSubmit} mt={4}>
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input type="text"  value={name} onChange={handleNameChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email:</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone:</FormLabel>
            <Input type="tel" value={phone} onChange={handlePhoneChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password:</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </FormControl>
          {error && <Text color="red">{error}</Text>}
          <Button type="submit" mt={6} colorScheme="blue" isFullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
