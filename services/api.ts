import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: 'https://5dc6-2804-1b1-fc80-17c-99b1-cf24-659-74c8.ngrok-free.app'
});

api.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }  
})

export { api };