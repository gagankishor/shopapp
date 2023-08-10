import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Select,
} from '@chakra-ui/react';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId) => {
    try {
      let url = 'http://localhost:5000/api/products'; // Default URL for fetching all products

    if (categoryId) {
      url = `http://localhost:5000/api/products/product_cate_id/${categoryId}`; // URL for fetching products based on category
    }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product-categories'); // Replace with the actual endpoint for fetching categories
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    if (selectedCategoryId === "") {
      fetchProducts(); 
    } else {
    fetchProducts(selectedCategoryId);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg">
        Product List
      </Heading>
      <Select value={selectedCategory} onChange={handleCategoryChange} mt={2}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.product_name}
          </option>
        ))}
      </Select>
      {products.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {products.map((product) => (
            <Card key={product.id}>
              <Image height={200} src={product.product_img} alt={product.product_name} />
              <CardHeader>
                <Heading as="h3" size="md">
                  {product.product_name}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>Price: ${product.product_price}</Text>
                {/* Add additional product information as needed */}
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" size="sm">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProductListPage;
