// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// const userService = async (token) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/google`,{token,},{withCredentials: true,});

//     return response.data;
//   } 
//   catch (error) {
//     throw error.response?.data || error;
//   }
// };

// export default userService;



// import api from "./axios.js";

// const userService = async (token) => {
//   try {
//     const response = await api.post("/api/auth/google", {token,});

//     return response.data;
//   } 
//   catch (error) {
//     throw error.response?.data || error;
//   }
// };

// export default userService;

import api from "./axios.js";


export const loginService = async (token) => {
    try {
      const response = await api.post("/api/auth/google", { token });
      return response.data;
    } 
    catch (error) {
      throw error.response?.data || error;
    }
};


export const getCurrentUser = async () => {
    try {
      const { data } = await api.post("/api/auth/me");
      console.log(data);
      return data.user;
    } 
    catch (error) {
      console.log(error);
      throw error.response?.data || error;
    }
};


export const logoutService = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      return data;
    } 
    catch (error) {
      throw error.response?.data || error;
    }
};