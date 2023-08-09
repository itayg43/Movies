import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';

export enum ApiRoute {
  AUTH = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

export default apiClient;
