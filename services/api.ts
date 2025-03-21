import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: 'https://5fe5-2804-1b1-fc80-462-dcc0-35c8-16ff-e298.ngrok-free.app'
});

api.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }  
})

export { api };