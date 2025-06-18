// // utils/api.js
// import axios from 'axios';

// const BASE_URL = 'https://assessments-xhy0.onrender.com/api';

// export const api = axios.create({
//   baseURL: BASE_URL,
// });
// export const submitBasicDetails = async (data) => {
//   try {
//     const response = await api.post('/form/details', data);
//     return response.data;
//   } catch (error) {
//     console.error('Error submitting basic details:', error);
//     throw error;
//   }
// };
// utils/api.js
// utils/api.js
import axios from 'axios';

const BASE_URL = 'https://assessments-xhy0.onrender.com'; 

export const api = axios.create({
  baseURL: BASE_URL,
});

// Function to submit the application data

export const submitApplication = async (data) => {
  try {
    const response = await api.post('/submit', data);
    return response.data;
  } catch (error) {
    console.error('API error details:', error.response?.data || error.message);
    throw error;
  }
};





