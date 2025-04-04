// /home/joelkvarnsmyr/projects/innerjourney/docs/src/hooks/useGroupedGitHubData.ts
import { useState, useEffect } from 'react';
import { fetchGitHubProjectData, GitHubProjectData } from '../api/api';

// Typ för det grupperade resultatet
export interface GroupedData {
    [key: string]: ProjectItem[];
}

// Interface för ett transformerat projektitem
export interface ProjectItem {
    id: string;
    title: string;
    description?: string;
    url?: string;
    objective?: string;
    status?: string;
    priority?: string;
    size?: string;
    estimate?: number | null;
    moscow?: string;
    team?: string;
    userValue?: string | null;
    releaseVersion?: string;
    financialImpact?: number | null;
    quarter?: string;
    risk?: string;
    stakeholder?: string;
    fundingSource?: string;
    dependencies?: string;
    discussionUrl?: string;
    ideaStatus?: string;
    assignees?: string[];
    labels?: string[];
    iteration?: { title?: string; startDate?: string } | null;
    milestone?: { title?: string; url?: string } | null;
    repository?: { nameWithOwner?: string; url?: string } | null;
    reviewers?: string[];
    parentIssue?: { title?: string; url?: string } | null;
    startDate?: string | null;
    endDate?: string | null;
    deadline?: string | null;
    linkedPullRequests?: any;
    subIssuesProgress?: string;
}

// Grupperingsnycklar
export type GroupByKey = 'moscow' | 'status' | 'priority' | 'team' | 'ideaStatus';

// Standardkategorier
const defaultCategoryLists: { [key in GroupByKey]: string[] } = {
    moscow: ['Must have', 'Should have', 'Could have', "Won't have"],
    status: ['Ideas', 'Backlog', 'Ready', 'In progress', 'In review', 'Done'],
    priority: ['P0', 'P1', 'P2'],
    team: ['Dev', 'Design', 'Admin', 'Backend', 'Frontend', 'Finance', 'UX', 'UX + Dev'],
    ideaStatus: ['New Idea', 'Under Discussion', 'Evaluated', 'Accepted', 'Rejected'], // Uppdaterade värden
};

const UNCATEGORIZED_KEY = 'Okategoriserad';

// Hjälpfunktion för att transformera rådata till ProjectItem
const transformItem = (item: GitHubProjectData['items']['nodes'][0]): ProjectItem => {
    const fieldValues = item.fieldValues.nodes.reduce((acc, fv) => {
        acc[fv.field.name] = fv.text || fv.number || fv.date || fv.name || fv.title || null;
        return acc;
    }, {} as { [key: string]: any });

    return {
        id: item.id,
        title: item.content.title,
        description: item.content.body,
        url: item.content.url,
        objective: fieldValues['Objective'],
        status: fieldValues['Status'],
        priority: fieldValues['Priority'],
        size: fieldValues['Size'],
        estimate: fieldValues['Estimate'],
        moscow: fieldValues['MoSCoW'],
        team: fieldValues['Team'],
        userValue: fieldValues['User Value'],
        releaseVersion: fieldValues['Release version'],
        financialImpact: fieldValues['Financial Impact'],
        quarter: fieldValues['Quarter'],
        risk: fieldValues['Risk'],
        stakeholder: fieldValues['Stakeholder'],
        fundingSource: fieldValues['Funding Source'],
        dependencies: fieldValues['Dependencies'],
        discussionUrl: fieldValues['Discussion URL'],
        ideaStatus: fieldValues['Idea Status'],
        assignees: item.content.assignees?.nodes.map(a => a.login) || [],
        labels: item.content.labels?.nodes.map(l => l.name) || [],
        iteration: fieldValues['Iteration'] ? { title: fieldValues['Iteration'], startDate: fieldValues['Iteration']?.startDate } : null,
        milestone: item.content.milestone ? { title: item.content.milestone.title, url: item.content.milestone.dueOn } : null,
        repository: item.content.repository ? { nameWithOwner: `${item.content.repository.owner.login}/${item.content.repository.name}`, url: item.content.repository.id } : null,
        reviewers: [],
        parentIssue: fieldValues['Parent issue'] ? { title: fieldValues['Parent issue'] } : null,
        startDate: fieldValues['Start date'],
        endDate: fieldValues['End date'],
        deadline: fieldValues['Deadline'],
        linkedPullRequests: null,
        subIssuesProgress: fieldValues['Sub-issues progress'],
    };
};

/**
 * Custom Hook för att hämta och gruppera GitHub-projektdata dynamiskt
 */
export function useGroupedGitHubData(groupBy: GroupByKey) {
    const [rawData, setRawData] = useState<GitHubProjectData | null>(null);
    const [groupedData, setGroupedData] = useState<GroupedData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchGitHubProjectData();
                if (isMounted) {
                    setRawData(data);
                    setError(null);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || 'Ett okänt fel inträffade vid datahämtning.');
                    setRawData(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (loading || error || !rawData) {
            setGroupedData({});
            return;
        }

        const items = rawData.items.nodes.map(transformItem);
        const grouped: GroupedData = {};
        const categories = defaultCategoryLists[groupBy] || [];

        [...categories, UNCATEGORIZED_KEY].forEach(cat => {
            grouped[cat] = [];
        });

        items.forEach(item => {
            const categoryValue = item[groupBy as keyof ProjectItem] as string | undefined | null;
            const categoryName = categoryValue || UNCATEGORIZED_KEY;
            if (!grouped[categoryName]) grouped[categoryName] = [];
            grouped[categoryName].push(item);
        });

        if (grouped[UNCATEGORIZED_KEY]?.length === 0 && Object.keys(grouped).length > 1) {
            delete grouped[UNCATEGORIZED_KEY];
        }

        setGroupedData(grouped);
    }, [rawData, groupBy, loading, error]);

    return { data: groupedData, loading, error };
}