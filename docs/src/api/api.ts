import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://innerjourney-backend-975065734812.europe-west1.run.app/api';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Ta bort interceptor eftersom vi inte behöver token för denna endpoint
// apiClient.interceptors.request.use(...)

export const fetchGitHubProjectData = async (): Promise<GitHubProjectData> => {
    try {
        console.log(`Frontend: Anropar ${baseURL}/github/project...`);
        const response = await apiClient.get('/github/project', {
            validateStatus: (status) => status >= 200 && status < 300,
        });
        console.log('Frontend: Mottog svar från /github/project:', response.status);

        if (!response.data || typeof response.data !== 'object') {
            console.error('Frontend: Data från backend är inte ett objekt!', response.data);
            throw new Error('Oväntat dataformat från backend.');
        }

        console.log(`Frontend: Mottog projekt med ${response.data.items.totalCount} items.`);
        return response.data as GitHubProjectData;
    } catch (error: any) {
        console.error('Frontend: Fel i fetchGitHubProjectData:', error);
        let message = 'Kunde inte hämta projektdata från servern.';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status, data } = error.response;
                message = `Serverfel (${status}): ${data?.detail || 'Okänt fel'}`;
            } else if (error.request) {
                message = 'Inget svar från servern. Kontrollera att backend körs och är nåbar.';
            } else {
                message = `Fel vid anrop: ${error.message}`;
            }
        } else {
            message = `Oväntat fel: ${error.message || String(error)}`;
        }
        throw new Error(message);
    }
};

// Typdefinitioner (uppdaterade från tidigare förslag)
interface FieldNode {
    id: string;
    name: string;
    dataType: string;
    options?: { id: string; name: string; color: string; description: string }[];
}

interface ItemNode {
    id: string;
    type: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    fieldValues: {
        totalCount: number;
        nodes: { text?: string; name?: string; optionId?: string; field: { id: string; name: string; dataType: string } }[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    content: {
        id: string;
        title: string;
        url: string;
        body: string;
        state?: string;
        number?: number;
        createdAt?: string;
        updatedAt?: string;
        closedAt?: string | null;
        author?: { login: string };
        assignees?: { totalCount: number; nodes: any[] };
        labels?: { totalCount: number; nodes: { id: string; name: string; color: string }[] };
        milestone?: any;
        repository?: { id: string; name: string; owner: { login: string } };
    };
}

export interface GitHubProjectData {
    id: string;
    title: string;
    url: string;
    shortDescription: string | null;
    public: boolean;
    closed: boolean;
    readme: string | null;
    owner: { login: string };
    createdAt: string;
    updatedAt: string;
    fields: {
        totalCount: number;
        nodes: FieldNode[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    items: {
        totalCount: number;
        nodes: ItemNode[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
}