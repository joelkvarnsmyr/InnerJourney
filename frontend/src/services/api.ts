import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    baseURL: 'https://innerjourney-backend-975065734812.europe-west1.run.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Lägg till idToken i alla anrop
apiClient.interceptors.request.use((config) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
});

// Interface för API-svar från getActivation
export interface ActivationResponse {
    title: string;
    description: string;
    duration: number;
    activation_type: string;
    category_id: string;
    prompt: string;
    log_type: string;
    prerequisite: string;
    repetitions: number;
    questions: string[];
    ai_assessment: boolean;
    coach_approval_required: boolean;
    net_enabled: boolean;
    introduction_message: string;
    preparation_message: string;
    activation_id: string;
    source: string;
}

// Interface för chattförfrågningar
export interface OnboardingChatRequest {
    userId?: string | null;
    userResponse?: string | null;
    conversation?: { role: string; message: string }[] | null;
}

// Interface för chattsvar
export interface OnboardingChatResponse {
    userId: string;
    message: string;
    conversation: { role: string; message: string }[];
    isComplete: boolean;
}

// Hämtar en aktivering baserat på humör, mål och profil
export const getActivation = async (mood: number, goal: string, profile: any): Promise<ActivationResponse> => {
    try {
        const response = await apiClient.post('/gemini/getActivation', { mood, goal, profile });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte generera aktivering');
    }
};

// Hanterar onboardingschatten (både start och fortsättning)
export const completeOnboardingChat = async (data: OnboardingChatRequest): Promise<OnboardingChatResponse> => {
    try {
        const response = await apiClient.post('/onboarding/chat', data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte fortsätta onboardingen');
    }
};

// Hjälpfunktion för att starta onboardingen
export const startOnboardingChat = async (): Promise<OnboardingChatResponse> => {
    return completeOnboardingChat({
        userId: null,
        userResponse: null,
        conversation: null,
    });
};

// Hjälpfunktion för att skicka ett svar i onboardingen
export const sendOnboardingResponse = async (
    userId: string,
    userResponse: string,
    conversation: { role: string; message: string }[]
): Promise<OnboardingChatResponse> => {
    return completeOnboardingChat({
        userId,
        userResponse,
        conversation,
    });
};

// Hämta användarens aktivering
export const fetchUserActivation = async (): Promise<ActivationResponse> => {
    try {
        const response = await apiClient.get('/user/activation');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte hämta aktivering');
    }
};