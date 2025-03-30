import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    baseURL: 'https://innerjourney-backend-975065734812.europe-west1.run.app', // Ersätt med din backend-URL
    headers: {
        'Content-Type': 'application/json',
    },
});

interface ActivationResponse {
    title: string;
    description: string;
    activation_id: string;
}

export const getActivation = async (mood: number, goal: string): Promise<ActivationResponse> => {
    try {
        const response = await apiClient.post('/gemini/getActivation', { mood, goal });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte generera aktivering');
    }
};