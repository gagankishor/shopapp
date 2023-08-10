import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Select, Flex, SimpleGrid, Image, Text } from '@chakra-ui/react';
import axios from 'axios';

const ProductsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch the categories from the API endpoint
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    try {
      const response = await axios.get(`http://localhost:5000/api/products/product_cate_id/${categoryId}`);
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" direction="column">
      <Box maxW="800px" p={4}>
        <Heading textAlign="center" mb={4}>
          View Products by Category
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Select Category:</FormLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.product_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <SimpleGrid columns={3} spacing={4}>
          {products.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="md" p={2}>
              <Image src={product.product_img} alt={product.product_name} />
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                {product.product_name}
              </Text>
              <Text mt={1}>Price: ${product.product_price}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default ProductsByCategory;
