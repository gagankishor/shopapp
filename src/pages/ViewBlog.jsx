import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import Dashboard from "./Dashboard";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`https://blog1-br26.onrender.com/api/users/items/${id}`);
      const data = response.data.results;
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };
  
  useEffect(() => {
    fetchBlogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
   <Box margin={"50px"} alignItems={"center"}> 
   <Box mb={"50px"} >
  <Image src={blog.image}  alt="Green double couch with wooden legs" borderRadius="lg" />
  <Heading as="h1" color="#f8f9fa" fontSize="2xl" mt={10} mb={10}>
    {blog.title}
  </Heading>
  <Text fontSize="md" color="#ced4da" mb={4}>
    {blog.description}
  </Text>
  {/* Additional blog content */}
</Box>
<Dashboard/>
</Box>
  );
}
