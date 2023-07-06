import axios from 'axios';

const BASE_URL = 'http://your-auth-api.com';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token to localStorage
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Remove token from localStorage
  },

  getToken: () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  },
};

export default authService;
