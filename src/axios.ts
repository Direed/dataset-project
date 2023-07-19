import axiosLib from 'axios';
import { localStorageType } from './enums/localStorage';

const token = localStorage.getItem(localStorageType.TOKEN) || '';

export const axios = axiosLib.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
    },
    baseURL: 'http://146.148.89.218:8502',
});

axios.interceptors.request.use((config) => {
    return config;
});
