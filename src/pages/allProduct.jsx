import {
  SimpleGrid,
  Text,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  Stack,
  ButtonGroup,
  Box,
  Spinner,
  Flex,
  Badge
} from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
        const response = await axios.delete(`http://localhost:5000/api/product-categories/${_id}`, {
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
  };
  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product-categories", {
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
    <SimpleGrid padding={50} spacing={10} minChildWidth={250}>
    {/* {tasks.map(results => (
      <Card key={results._id}  boxShadow={"dark-lg"} height={"auto"} borderLef="8px" borderColor="#c5c5c5" bg="#ffffff">
        <Box as="button" onClick={() => handleView(results._id)}>
          <CardBody height={360}>
            <Image
              height={150}
              width={300}
              src={results.image}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="4" spacing="3">
              <Heading textAlign="center" size="sm">
                {results.title.slice(0, 50)}
              </Heading>
              <Text size="sm" textAlign="justify" dangerouslySetInnerHTML={{ __html: results.description.slice(0, 100) }}>
              </Text>
            </Stack>
          </CardBody>
        </Box>  
        {token && (
          <CardFooter>
            <ButtonGroup>
              <Button variant="ghost" colorScheme="red" onClick={() => handleClick(results._id)}>
                DELETE
              </Button>
              <Button variant="ghost" colorScheme="blue" onClick={() => handleEdit(results._id)}>
                Edit
              </Button>
            </ButtonGroup>
          </CardFooter>
        )}
        <Box position="absolute" top="-5" right="-3">
          <Badge colorScheme="blue">
            {results.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)
              ? "Today"
              : results.createdAt.slice(0, 10) === new Date(new Date().getTime() - 86400000).toISOString().slice(0, 10)
                ? "Yesterday"
                : results.createdAt.slice(0, 10)}
          </Badge>
        </Box>
      </Card>
    ))} */}
  </SimpleGrid>
  )
}
