import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const fetchSurveys = () => api.get('/list.json');
export const fetchSurveyByCode = (code) => api.get(`/${code}.json`);

export default api;