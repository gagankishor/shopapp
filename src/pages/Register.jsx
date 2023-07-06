import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Heading, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://blog1-br26.onrender.com/api/users/register',
        {
          email,
          password,
          
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        toast({
          title: 'Registration successful.',
          description: 'You have successfully registered.',
          duration: 10000,
          isClosable: true,
          position: 'top',
          status: 'success',
          icon: <UnlockIcon />,
        });
        navigate('/login');
      }
    } catch (error) {
      setError('Failed to register. Please check your credentials.');
    }
  };

  return (
    <div>
      <Heading>Register</Heading>
      <form onSubmit={handleSubmit}>
        <Box w={400} my={5}>
        <FormControl isRequired>
          <FormLabel>Username:</FormLabel>
          <Input type="text" value={username} onChange={handleUsernameChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password:</FormLabel>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </FormControl></Box>
        {error && <p>{error}</p>}
        <Button mt={10} type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
