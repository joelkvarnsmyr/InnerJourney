import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',  // Lokal Docker-test
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interface för ett projektitem från GitHub
export interface GitHubProjectItem {
    id: string;
    title: string;
    description: string;
    url: string;
    status?: string;
    subIssuesProgress?: string;
    priority?: string;
    size?: string;
    estimate?: number;
    iteration?: string;
    startDate?: string;
    endDate?: string;
    moscow?: string;
    userValue?: number;
    dependencies?: string[];
    objective?: string;
    team?: string;
    assignees?: string[];
    labels?: string[];
    linkedPullRequests?: string[];
    milestone?: string;
    repository?: string;
    releaseVersion?: string;
    financialImpact?: number;
    quarter?: string;
    risk?: string;
    stakeholder?: string;
    fundingSource?: string;
}

// Interface för GitHub-projektdata
export interface GitHubProjectData {
    "Must have": GitHubProjectItem[];
    "Should have": GitHubProjectItem[];
    "Could have": GitHubProjectItem[];
    "Won't have": GitHubProjectItem[];
}

// Funktion för att hämta GitHub-projektdata från backend
export const getGitHubProjectData = async (): Promise<GitHubProjectData> => {
    try {
        const response = await apiClient.get('/api/github/moscow');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte hämta GitHub-projektdata');
    }
};