import axios from 'axios';
import * as config from '../config'

const apiClient = axios.create({
    baseURL: `${config.BASE_URL}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials:true
  });
  export default apiClient;