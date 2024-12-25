import { useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "./GlobalContext";

const useAuth = () => {
  const { accessToken, setAccessToken } = useContext(GlobalContext);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const refreshResponse = await axios.post("/api/office/token");
            setAccessToken(refreshResponse.data.accessToken);
            error.config.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.accessToken}`;
            return axios(error.config);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [setAccessToken]);

  return { accessToken };
};

export default useAuth;
