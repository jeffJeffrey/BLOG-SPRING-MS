import axios from 'axios';
import Cookies from 'js-cookie';
import { PUBLIC_GATWAY_URL } from "../api"; 

const API_URL = PUBLIC_GATWAY_URL 

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export default api;