// docs/src/api/api.ts
import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    // Uppdatera baseURL om din backend körs någon annanstans i produktion
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api', // Exempel: Relativ i prod, localhost i dev
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // Lägg till en timeout (15 sekunder)
});

/**
 * Interface för ett projektitem.
 * Försöker matcha fälten som skapas i python-funktionen fetch_all_project_items_from_github.
 * OBS: Justera typerna för nästlade objekt (iteration, milestone, etc.) baserat på
 * exakt hur de returneras av din backend / GraphQL.
 */
export interface ProjectItem {
    id: string;
    title: string;
    description?: string; // Från issue/pr body
    url?: string; // URL till issue/pr på GitHub
    objective?: string; // Anpassat fält
    status?: string; // Anpassat fält (Single Select)
    priority?: string; // Anpassat fält (Single Select)
    size?: string; // Anpassat fält (Single Select)
    estimate?: number | null; // Anpassat fält (Number) - kan vara null
    moscow?: string; // Anpassat fält (Single Select)
    team?: string; // Anpassat fält (Single Select)
    userValue?: string | null; // Anpassat fält (Single Select) - var string i hook, kan vara null
    releaseVersion?: string; // Anpassat fält (Single Select) - bytt namn i python?
    financialImpact?: number | null; // Anpassat fält (Number) - bytt namn i python? kan vara null
    quarter?: string; // Anpassat fält (Text)
    risk?: string; // Anpassat fält (Text)
    stakeholder?: string; // Anpassat fält (Text)
    fundingSource?: string; // Anpassat fält (Text) - bytt namn i python?
    dependencies?: string; // Anpassat fält (Text) - Var string[] i hook? Python splittar inte längre?
    discussionUrl?: string; // Anpassat fält (Text)
    ideaStatus?: string; // Anpassat fält (Single Select)

    // Fält från GitHub Issue/PR Content
    assignees?: string[]; // Lista av logins (transformerad i python)
    labels?: string[]; // Lista av namn (transformerad i python)
    iteration?: { title?: string; startDate?: string; } | null; // Antagande om objektstruktur
    milestone?: { title?: string; url?: string; } | null; // Antagande om objektstruktur
    repository?: { nameWithOwner?: string; url?: string; } | null; // Antagande om objektstruktur
    reviewers?: string[]; // Lista av logins (antagande, baserat på assignees)
    parentIssue?: { title?: string; url?: string; } | null; // Antagande om objektstruktur

    // Datumfält
    startDate?: string | null; // Anpassat fält (Date) - bytt namn i python?
    endDate?: string | null; // Anpassat fält (Date) - bytt namn i python?
    deadline?: string | null; // Anpassat fält (Date)

    // Eventuellt andra fält du behöver
    linkedPullRequests?: any; // Okänd struktur, sätt till any tills vidare
    subIssuesProgress?: string; // Verkar saknas i python-koden?
}

/**
 * Hämtar ALLA projekt-items som en platt lista från backend.
 * Förväntar sig att backend anropar '/api/github/items'.
 */
export const fetchAllProjectItems = async (): Promise<ProjectItem[]> => {
    try {
        console.log('Frontend: Anropar /github/items...'); // Loggning i frontend
        const response = await apiClient.get('/github/items'); // Anropa den NYA endpointen
        console.log('Frontend: Mottog svar från /github/items:', response.status);

        // Validera att vi fick en array tillbaka
        if (!Array.isArray(response.data)) {
            console.error('Frontend: Data från backend är inte en array!', response.data);
            throw new Error('Oväntat dataformat från backend.');
        }

        console.log(`Frontend: Mottog ${response.data.length} projekt-items.`);
        return response.data as ProjectItem[]; // Returnera den platta arrayen

    } catch (error: any) {
        console.error("Frontend: Fel i fetchAllProjectItems:", error);
        let message = 'Kunde inte hämta projektdata från servern.';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Servern svarade med en statuskod utanför 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                message = `Serverfel (${error.response.status}): ${error.response.data?.detail || 'Okänt serverfel'}`;
            } else if (error.request) {
                // Requesten gjordes men inget svar mottogs
                console.error('Error request:', error.request);
                message = 'Inget svar från servern. Kontrollera att backend körs och är nåbar.';
            } else {
                // Något hände när requesten sattes upp
                console.error('Error message:', error.message);
                message = `Fel vid anrop: ${error.message}`;
            }
        } else {
            message = `Oväntat fel: ${error.message || String(error)}`;
        }
        // Kasta felet vidare så att hooken kan fånga det
        throw new Error(message);
    }
};

// Gamla MoSCoW-specifika delar (kan tas bort eller behållas för referens)
/*
export interface GitHubProjectData {
    "Must have": ProjectItem[];
    "Should have": ProjectItem[];
    "Could have": ProjectItem[];
    "Won't have": ProjectItem[];
}

export const getGitHubProjectData = async (): Promise<GitHubProjectData> => {
    try {
        const response = await apiClient.get('/github/moscow');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Kunde inte hämta GitHub-projektdata');
    }
};
*/