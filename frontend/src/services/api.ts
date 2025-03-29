import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

export const initBirthdata = async (birthData: { birth_date: string; birth_time: string; birth_location: string }) => {
    const response = await api.post('/init-birthdata', birthData);
    return response.data;
};