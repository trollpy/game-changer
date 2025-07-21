import axios from 'axios';

const API_URL = '/api/messages';

const sendMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, messageData, config);
  return response.data;
};

const getMessages = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/${userId}`, config);
  return response.data;
};

const getConversations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${API_URL}/conversations`, config);
  return response.data;
};

export default {
  sendMessage,
  getMessages,
  getConversations
};