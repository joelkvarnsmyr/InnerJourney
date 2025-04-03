import { useState, useEffect } from 'react';
import { getGitHubProjectData as fetchGitHubProjectData, GitHubProjectData } from './api';  // Döper om för att undvika namnkonflikt

// Definiera typen för ett projektitem
interface ProjectItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  status?: string; // "Backlog", "Ready", "In Progress", "In Review", "Done", "Ideas"
  subIssuesProgress?: string; // T.ex. "2/5 (40%)"
  priority?: string; // "P0", "P1", "P2"
  size?: string; // "XS", "S", "M", "L", "XL"
  estimate?: number; // T.ex. 5 (timmar)
  iteration?: string; // T.ex. "Iteration 1"
  startDate?: string; // T.ex. "2025-04-01"
  endDate?: string; // T.ex. "2025-04-03"
  moscow?: string; // "Must have", "Should have", "Could have", "Won't have"
  userValue?: string; // Ändrat till string eftersom det är ett single-select-fält
  dependencies?: string[];
  objective?: string;
  team?: string; // "Dev", "Design", "Admin", etc.
  assignees?: string[];
  labels?: string[];
  linkedPullRequests?: string[];
  milestone?: string;
  repository?: string;
  reviewers?: string[];
  parentIssue?: string;
  releaseVersion?: string; // "R1", "R2", "R3"
  financialImpact?: number;
  quarter?: string;
  risk?: string;
  stakeholder?: string;
  fundingSource?: string;
  discussionUrl?: string;
}

// Definiera en typ för kategorier
type ProjectCategory = 'Must have' | 'Should have' | 'Could have' | "Won't have";

// Använd ett Record för att mappa kategorier till projektitems
interface GitHubProjectData {
  [key: string]: ProjectItem[];
}

export default function getGitHubProjectData() {  // Ändrat från useGitHubProjectData till getGitHubProjectData
  const [data, setData] = useState<GitHubProjectData>({
    'Must have': [],
    'Should have': [],
    'Could have': [],
    "Won't have": [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await fetchGitHubProjectData();  // Använder den omdöpta funktionen
        setData(projectData);
      } catch (err: any) {
        console.error('Fel vid hämtning av GitHub-projektdata:', err);
        setError('Kunde inte hämta data från backend. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}