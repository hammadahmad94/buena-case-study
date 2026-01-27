import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};

export const getProperties = async () => {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data;
};

export const getPropertyById = async (id) => {
    const response = await axios.get(`${API_URL}/properties/${id}`);
    return response.data;
};