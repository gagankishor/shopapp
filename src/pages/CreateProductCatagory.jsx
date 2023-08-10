import { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input,  Button, Flex, Spinner, SelectField } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function CreateCatagory() {
  const [product_name, setTitle] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();
  const editor = useRef(null);
  const [isLoading, setLoading] = useState(false); // Add isLoading state
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/product-categories', {
        method: 'POST',
        body: JSON.stringify({ product_name, image }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res)
      if (!res.ok) {
        throw new Error('Failed to create a ');
      }
      setLoading(false);
      console.log(' added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding :', error);
    }
  };
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );  }
    return (
      <Flex  align="center" justify="center" minHeight={"100vh" } >
        <Box maxW="880px" p={4}>
          <Heading textAlign="center" mb={4}>
            Create Product Category 
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel> Name:</FormLabel>
              <Input
                type="text"
                value={product_name}
                name="product_name"
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* <FormHelperText>Enter a descriptive Blog name.</FormHelperText> */}
            </FormControl>
    
            <FormControl mb={4}>
              <FormLabel>upload image</FormLabel>
              <Input
                type="file"
                
                name="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
           
            
    
            
    
            <Button type="submit" colorScheme="blackAlpha" isFullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    );
}




