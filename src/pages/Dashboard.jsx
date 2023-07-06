// import { ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons"
import {
  // Box,
  SimpleGrid,
  Text,
  // Flex,
  Heading,
  Card,
  // CardHeader,
  CardBody,
  CardFooter,
  // HStack,
  Divider,
  Button,
  // Avatar,
  Image,
  Stack,
  ButtonGroup
} from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetchQuizData();
  }, []);
  
  
  const handleClick = async (_id) => {
    if (token) {
      try {
        const response = await axios.delete(`https://blog1-br26.onrender.com/api/users/items/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log('Item deleted successfully');
          window.location.reload();
          // Perform any additional actions after successful deletion
        } else {
          throw new Error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      const confirmDelete = window.confirm('You need to be logged in. Do you want to go to the login page?');
      if (confirmDelete) {
        navigate('/login');
      }
    }
  };
  
  const handleEdit = (_id) => {
    if (token) {
      console.log("token found");
      navigate(`/editblog/${_id}`);
    } else {
      console.log("token not found");
      const confirmEdit = window.confirm('You need to be logged in. Do you want to go to the login page?');
      if (confirmEdit) {
        navigate('/login');
      }
    }
  };
  
  const fetchQuizData = async () => {
    try {
      const response = await axios.get('https://blog1-br26.onrender.com/api/users/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.results;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  
  return (
    <SimpleGrid spacing={10} minChildWidth={300}>
      {tasks.map(results => (
        <Card key={results._id} borderTop="8px" borderLef borderColor="#eddea4" bg="#e0e1dd">
          <NavLink to={`/viewblog/${results._id}`}>
          <CardBody>
            <Image
              src={results.image}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{results.title}</Heading>
              <Text>
                {results.description.slice(0, 130)} ...
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                Created  {results.createdAt.slice(0, 10)}
              </Text>
            </Stack>
          </CardBody></NavLink>
          <Divider />
          <CardFooter>
          
            <ButtonGroup >

              <Button variant='ghost' colorScheme='red' onClick={() => handleClick(results._id)} >
                DELETE
              </Button>
              
              <Button variant='ghost' colorScheme='blue' onClick={() => handleEdit(results._id)}>
                Edit
              </Button>
            </ButtonGroup>
          </CardFooter>
          
        </Card>
      ))}
    </SimpleGrid>
  )
}
