import axios from 'axios';

const API_URL = '/api/users';

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const getNearbyFarmers = async (location, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/farmers/nearby`, {
    ...config,
    params: location
  });
  return response.data;
};

export default {
  getUsers,
  getUserById,
  getNearbyFarmers
};