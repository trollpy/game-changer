// frontend/src/api/marketPriceApi.js
import axios from 'axios';

// Create axios instance with base URL and headers
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Fixed: proper API URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Added timeout
});

// Add request interceptor for auth token if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error - please check if the server is running');
    }
    
    // Handle API errors
    const errorMessage = error.response.data?.message || 
                        error.response.data?.error || 
                        `Server error: ${error.response.status}`;
    
    throw new Error(errorMessage);
  }
);

const MarketPriceAPI = {
  /**
   * Get market prices with pagination and filtering
   */
  getMarketPrices: async (params = {}) => {
    try {
      console.log('Fetching market prices with params:', params);
      const response = await apiClient.get('/market-prices', { params });
      console.log('Market prices response:', response.data);
      
      // Handle different response structures
      if (response.data.data) {
        return response.data.data; // If response has { data: [...] }
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('MarketPriceAPI.getMarketPrices error:', error);
      throw error;
    }
  },

  /**
   * Get latest prices for each commodity
   */
  getLatestMarketPrices: async (limit = 20, commodities = '') => {
    try {
      console.log('Fetching latest market prices');
      const response = await apiClient.get('/market-prices/latest', {
        params: { limit, commodities }
      });
      console.log('Latest market prices response:', response.data);
      
      // Handle different response structures
      if (response.data.data) {
        return response.data.data;
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('MarketPriceAPI.getLatestMarketPrices error:', error);
      throw error;
    }
  },

  /**
   * Get price history for a specific commodity
   */
  getPriceHistory: async (commodity, market = '', region = '', days = 30) => {
    try {
      console.log('Fetching price history for:', commodity);
      const response = await apiClient.get('/market-prices/history', {
        params: { commodity, market, region, days }
      });
      console.log('Price history response:', response.data);
      
      // Handle different response structures
      if (response.data.data) {
        return response.data.data;
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('MarketPriceAPI.getPriceHistory error:', error);
      throw error;
    }
  }
};

export default MarketPriceAPI;