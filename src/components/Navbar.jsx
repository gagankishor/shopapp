import { UnlockIcon } from "@chakra-ui/icons";
import { Flex, Heading, Button, Spacer, HStack, useToast, AvatarBadge, Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const toast = useToast();
  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };
  const [token, setToken] = useState(getToken());
  useEffect(() => {
    setToken(getToken());
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast({
      title: 'Logged out.',
      description: "Successfully logged out",
      duration: 10000,
      isClosable: true,
      position: 'top',
      status: 'success',
      icon: <UnlockIcon />,
    });
    window.location.reload();
  };

  return (
    <Flex as="nav" p="5px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">ALL BLOG</Heading>
      <Spacer />

      <HStack spacing="20px"> 
        <Avatar name="mario" as={Link} to="/profile" src="/img/mario.png">
          <AvatarBadge boxSize="1.3em" bg="teal.500">
            <Text fontSize="xs" color="white">3</Text>
          </AvatarBadge>
        </Avatar>
        
        {token ? (
          <Button 
            colorScheme="blue"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button colorScheme="blue" as={Link} to="/login">
            Login
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
