import axios from 'axios';
import qs from 'qs';

const request = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: {
    serialize(params: object) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
  },
});

export { request };
