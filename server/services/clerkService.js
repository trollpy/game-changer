import axios from 'axios';

const CLERK_API_URL = process.env.CLERK_API_URL;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const clerkApi = axios.create({
  baseURL: CLERK_API_URL,
  headers: {
    Authorization: `Bearer ${CLERK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const createClerkUser = async (userData) => {
  try {
    const response = await clerkApi.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating Clerk user:', error.response?.data || error.message);
    throw error;
  }
};

export const updateClerkUser = async (userId, userData) => {
  try {
    const response = await clerkApi.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating Clerk user:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteClerkUser = async (userId) => {
  try {
    const response = await clerkApi.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Clerk user:', error.response?.data || error.message);
    throw error;
  }
};