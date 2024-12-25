import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

export default instance;
