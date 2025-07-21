import axios from 'axios';

const API_URL = '/api/market-prices';

const getMarketPrices = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const getLatestMarketPrices = async (limit = 20) => {
  const response = await axios.get(`${API_URL}/latest`, { params: { limit } });
  return response.data;
};

export default {
  getMarketPrices,
  getLatestMarketPrices
};
