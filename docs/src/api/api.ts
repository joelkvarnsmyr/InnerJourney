// docs/src/api/api.ts
import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

/**
 * Interface för ett fält i ProjectV2
 */
interface ProjectField {
    id: string;
    name: string;
    dataType: string;
    options?: { id: string; name: string; color: string; description?: string }[];
    configuration?: {
        startDay?: number;
        duration?: number;
        iterations?: { id: string; title: string; startDate: string; duration: number }[];
        completedIterations?: { id: string; title: string; startDate: string; duration: number }[];
    };
}

/**
 * Interface för ett fältvärde i ett item
 */
interface FieldValue {
    text?: string;
    number?: number;
    date?: string;
    name?: string;
    optionId?: string;
    title?: string;
    iterationId?: string;
    startDate?: string;
    duration?: number;
    field: {
        id: string;
        name: string;
        dataType: string;
        options?: { id: string; name: string }[];
    };
}

/**
 * Interface för ett item i ProjectV2
 */
interface ProjectItem {
    id: string;
    type: 'ISSUE' | 'PULL_REQUEST' | 'DRAFT_ISSUE';
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    fieldValues: {
        totalCount: number;
        nodes: FieldValue[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    content: {
        id: string;
        title: string;
        body?: string;
        url?: string;
        state?: 'OPEN' | 'CLOSED';
        number?: number;
        createdAt?: string;
        updatedAt?: string;
        closedAt?: string | null;
        merged?: boolean;
        mergedAt?: string | null;
        author?: { login: string };
        creator?: { login: string };
        assignees?: { totalCount: number; nodes: { login: string }[] };
        labels?: { totalCount: number; nodes: { id: string; name: string; color: string }[] };
        milestone?: { id: string; title: string; dueOn?: string; state?: string } | null;
        repository?: { id: string; name: string; owner: { login: string } };
    };
}

/**
 * Interface för hela ProjectV2-svaret från backend
 */
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
        nodes: ProjectField[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    items: {
        totalCount: number;
        nodes: ProjectItem[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
}

/**
 * Hämtar all rådata för projektet från backend
 */
export const fetchGitHubProjectData = async (): Promise<GitHubProjectData> => {
    try {
        console.log('Frontend: Anropar /github/project...');
        const response = await apiClient.get('/github/project');
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
                message = `Serverfel (${error.response.status}): ${error.response.data?.detail || 'Okänt serverfel'}`;
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