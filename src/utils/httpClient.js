import axios from "axios";
import httpConfig from "../config/httpConfig";
import { getToken } from "./token";

const createHttpClient = () => {
  console.log("BASE : ", httpConfig.api.baseURL);
    const httpClient = axios.create({
        baseURL : httpConfig.api.baseURL,
        withCredentials: false,
    });
    
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

    // Intercept requests sent, basic activities before the task
    httpClient.interceptors.request.use(
        (value) => value,
        (error) => {
          return Promise.reject(error);
        }
    );
    
    // Intercept response, basic activities after the task
    httpClient.interceptors.response.use(
    (res) => res.data,
    (error) => {
        return Promise.reject(error);
    }
    );
    return httpClient;
}


const httpClient = createHttpClient();

export default httpClient;