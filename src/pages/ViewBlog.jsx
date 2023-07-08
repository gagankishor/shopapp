import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import Dashboard from "./Dashboard";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`https://blog1-br26.onrender.com/api/users/items/${id}`);
      const data = response.data.results;
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogData();
    const documentHeight = Math.floor((document.documentElement.scrollHeight - window.innerHeight) * 0);
    window.scrollTo(0, documentHeight / 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id ,isLoading]);
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );  }
  if (!blog) {
    return <div>Error loading blog data.</div>;
  }
  return (<Box margin="100px">
    <Box margin="50px" alignItems="center">
      <Box mb="50px" textAlign="center">
        <Image src={blog.image} width={1300} mb={5} height={600} alt="Green double couch with wooden legs" borderRadius="lg" />
        <Divider />
        <Heading as="h1" color="#1b263b" fontSize="2xl" mt={5} mb={5}>
          {blog.title}
        </Heading>
        <Divider />
        <Text fontSize="md" textAlign="justify" color="#415a77" mt={5} mb={4} dangerouslySetInnerHTML={{ __html: blog.description }}>
        </Text>
        <Divider />
      </Box>
    </Box>
      <Dashboard />
    </Box>
  );
}
