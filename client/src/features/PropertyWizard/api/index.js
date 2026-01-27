import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/extract`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const saveProperty = async (propertyData) => {
    const response = await axios.post(`${API_URL}/properties`, propertyData);
    return response.data;
};
