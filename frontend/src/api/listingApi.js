import axios from 'axios';

const API_URL = '/api/listings';

// Axios interceptor for rate limiting
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded:', error.config.url);
      // You can implement retry logic or notify the user here
    }
    return Promise.reject(error);
  }
);

const createListing = async (listingData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(API_URL, listingData, config);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Create listing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create listing'
    };
  }
};

const getListings = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });

    return {
      success: true,
      data: Array.isArray(response.data) ? response.data : []
    };
  } catch (error) {
    console.error('Get listings error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch listings',
      data: []
    };
  }
};

const getListingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    if (!response.data) {
      throw new Error('Listing not found');
    }

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Get listing by ID error (${id}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Listing not found'
    };
  }
};

const updateListing = async (id, listingData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.put(`${API_URL}/${id}`, listingData, config);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Update listing error (${id}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update listing'
    };
  }
};

const deleteListing = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`${API_URL}/${id}`, config);

    return {
      success: true,
      data: { id }
    };
  } catch (error) {
    console.error(`Delete listing error (${id}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete listing'
    };
  }
};

const getUserListings = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_URL}/user/${userId}`, config);

    return {
      success: true,
      data: Array.isArray(response.data) ? response.data : []
    };
  } catch (error) {
    console.error(`Get user listings error (${userId}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user listings',
      data: []
    };
  }
};

export default {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getUserListings
};
