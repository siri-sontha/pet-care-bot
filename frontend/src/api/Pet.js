import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/pets' });

export const chatWithBot = (message) => API.post('/chat', { message });
