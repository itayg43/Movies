import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

export const apiReissueClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

export default apiClient;
