import axios, {AxiosInstance} from 'axios';
import {VARIABLES} from './variables';

export const BASE_URL = VARIABLES.BASE_URL;
export const IMAGE_BASE = VARIABLES.BASE_URL;

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosApi;
