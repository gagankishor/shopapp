import { Box, Heading, FormControl, FormLabel, Input,  Button, Flex, Spinner, SelectField } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { useEffect } from 'react';

export default function Create() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    product_cate_id: '',
    product_name: '',
    product_price: '',
    product_img: null,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleImageChange = (event) => {
    setProductData({
      ...productData,
      product_img: event.target.files[0],
    });
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        console.log(data.product_name)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
    formData.append('product_cate_id', productData.product_cate_id);
    formData.append('product_name', productData.product_name);
    formData.append('product_price', productData.product_price);
    formData.append('product_img', productData.product_img);
  
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error('Failed to create a product');
      }
  
      setLoading(false);
      console.log('Product added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
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
            Create Product
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel> Name:</FormLabel>
              <Input
                type="text"
                value={productData.product_name}
                name="product_name"
                onChange={handleChange}
              />
            </FormControl>
    
            <FormControl mb={4}>
        <FormLabel>upload image</FormLabel>
        <Input type="file" name="product_img" onChange={handleImageChange} />
      </FormControl>
            <FormControl mb={4}>
              <FormLabel>price</FormLabel>
              <Input
                type="number"
                
                name="product_price"
                value={productData.product_price}
                onChange={handleChange}

              />
            </FormControl>
            <FormControl mb={4}>
        <FormLabel>select category</FormLabel>
        <SelectField
            value={productData.product_cate_id}
            name="product_cate_id"
            onChange={handleChange}        >
          {/* Map over the categories and create an option for each one */}
          {categories.map((category) => (
            <option key={category.product_name} value={category.id}>
              {category.product_name}
            </option>
          ))}
        </SelectField>
      </FormControl>
    
            
    
            <Button type="submit" colorScheme="blackAlpha" isFullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    );
}




