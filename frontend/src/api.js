import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const fetchSurveys = () => api.get('/list.json');
export const fetchSurveyByCode = (code) => api.get(`/${code}.json`);

export default api;