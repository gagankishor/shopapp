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
  ButtonGroup,
  Box,
  Spinner,
  Flex
  
} from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading, setLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handleView = (id) => {
    console.log(id)
      navigate(`/Viewblog/${id}`);
      // window.location.reload();
  };
  
  
  const fetchQuizData = async () => {
    try {
      const response = await axios.get("https://blog1-br26.onrender.com/api/users/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.results;
      setTasks(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  
  return (
    <SimpleGrid spacing={10} minChildWidth={250}>
      {tasks.map(results => (
        <Card key={results._id} borderTop="8px" height={450} borderLef borderColor="#eddea4" bg="#ffffff">
          {/* <NavLink to={`/viewblog/${results._id}`} onClick={window.location.reload()} > */}
          <Box as="button" onClick={() => handleView(results._id)}>
          <CardBody height={360} >
            <Image
              height={150}
              width={300}
              src={results.image}
              alt='Green double couch with wooden legs'
              borderRadius='lg' 
            />
            <Stack mt='4' spacing='3'>
              <Heading textAlign={"center"}  size='sm'>{results.title.slice(0, 50)}</Heading>
              <Text size='sm'  textAlign={"justify"} dangerouslySetInnerHTML={{ __html: results.description.slice(0, 100) }}> 
                {/* {results.description.slice(0, 130)} */}
                 
              </Text>
              <Text mt={25}  color='blue.600' fontSize='sm'>
                Created  {results.createdAt.slice(0, 10)}
              </Text>
            </Stack>
          </CardBody>
          </Box>
          {/* </NavLink> */}
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
