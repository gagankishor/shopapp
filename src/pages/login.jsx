import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, FormControl, FormLabel, Input, Button, useToast, Flex, Box,  Text } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://blog1-br26.onrender.com/api/users/login', {
        email,
        password,
      });

      if (response.data) {
        // Assuming the server responds with a JWT in the 'token' property
        const token = response.data.results.accessToken;

        // Store the JWT in local storage
        localStorage.setItem('token', token);

        toast({
          title: 'Login successful.',
          description: 'You have successfully logged in.',
          duration: 10000,
          isClosable: true,
          position: 'top',
          status: 'success',
        });

        // Redirect the user to the protected dashboard page
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Flex align="center" mt={-100} justify="center" height="100vh">
      <Box textAlign="center" maxWidth={400} p={8} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit} mt={4}>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password:</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </FormControl>
          {error && <Text color="red">{error}</Text>}
          <Button type="submit" mt={6} colorScheme="blue" isFullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
  
};

export default Login;
