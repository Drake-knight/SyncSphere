import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5100',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token && (!config.url.includes('/login') || !config.url.includes('register'))) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;