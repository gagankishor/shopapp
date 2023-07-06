import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heading, FormControl, FormLabel, Input, Button, useToast, Flex, Box } from '@chakra-ui/react';
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
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl w={400}>
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl w={400}>
          <FormLabel>Password:</FormLabel>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </FormControl>
        {error && <p>{error}</p>}
        <Flex  mt={10}>
        <Box>
         </Box><Box ms={10}><Button type="submit" colorScheme="blue" >
            Login
          </Button>
          </Box>
          <Box>
         </Box><Box ms={10}><Button colorScheme="blue" as={Link} to="/register">
            SingUp
          </Button>
          </Box>
        </Flex>

      </form>
    </div>
  );
};

export default Login;
