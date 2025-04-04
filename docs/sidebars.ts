// docs/sidebars.ts
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro', // Docusaurus lägger till en/ eller sv/ automatiskt
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'User Experience',
      link: { type: 'generated-index', title: 'User Experience' },
      items: [
        { type: 'doc', id: 'user-experience/2025-04-01-activations-2025' },
        { type: 'doc', id: 'user-experience/2025-04-01-onboarding-r2-vision-and-flow-2025' },
        { type: 'doc', id: 'user-experience/2025-04-01-user-flow-r1-2025' },
        { type: 'doc', id: 'user-experience/2025-04-01-user-interface-ui-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Technical Specifications',
      link: { type: 'generated-index', title: 'Technical Specifications' },
      items: [
        { type: 'doc', id: 'technical-specifications/2025-04-01-backend-onboarding-guide-2025' },
        { type: 'doc', id: 'technical-specifications/2025-04-01-backend-technical-documentation-2025' },
        { type: 'doc', id: 'technical-specifications/2025-04-01-database-structure-2025' },
        { type: 'doc', id: 'technical-specifications/2025-04-01-frontend-setup-development-and-deployment-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Finance and Administration',
      link: { type: 'generated-index', title: 'Finance and Administration' },
      items: [
        { type: 'doc', id: 'finance-and-administration/2025-04-01-action-plan-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-budget-mvp-first-year-operations-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-capital-needs-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-financing-opportunities-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-financing-strategy-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-investor-report-v15-2025' },
        { type: 'doc', id: 'finance-and-administration/2025-04-01-revenue-model-and-roi-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Human Resources',
      link: { type: 'generated-index', title: 'Human Resources' },
      items: [
        { type: 'doc', id: 'human-resources/2025-04-01-coaching-certification-program-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-employee-development-plan-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-guidelines-for-community-interaction-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-onboarding-process-for-new-employees-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-performance-management-and-feedback-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-recruitment-guide-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-remote-work-policy-2025' },
        { type: 'doc', id: 'human-resources/2025-04-01-work-environment-and-values-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Marketing Strategy',
      link: { type: 'generated-index', title: 'Marketing Strategy' },
      items: [
        { type: 'doc', id: 'marketing-strategy/2025-04-01-competitive-analysis-2-market-position-for-innerjourney-2025' },
        { type: 'doc', id: 'marketing-strategy/2025-04-01-competitor-analysis-1-2025' },
        { type: 'doc', id: 'marketing-strategy/2025-04-01-market-analysis-innerjourney-2025' },
        { type: 'doc', id: 'marketing-strategy/2025-04-01-quick-elevator-pitches-2025' },
        { type: 'doc', id: 'marketing-strategy/2025-04-01-swot-analysis-for-innerjourney-2025' },
        { type: 'doc', id: 'marketing-strategy/2025-04-01-unique-value-proposition-usp-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Security Testing',
      link: { type: 'generated-index', title: 'Security Testing' },
      items: [
        { type: 'doc', id: 'security-testing/2025-04-01-security-document-2025' },
        { type: 'doc', id: 'security-testing/2025-04-01-test-plan-2025' },
      ],
    },
    {
      type: 'category',
      label: 'Project Overview',
      link: { type: 'generated-index', title: 'Project Overview' },
      items: [
        { type: 'doc', id: 'project-overview/2025-04-01-visionar-grund-1' },
        { type: 'doc', id: 'project-overview/2025-04-02-githubproject' },
        { type: 'doc', id: 'project-overview/coaching-strategi-2025' },
        { type: 'doc', id: 'project-overview/forskningsinitiativ-2025' },
        { type: 'doc', id: 'project-overview/projektbeskrivning-2025' },
        { type: 'doc', id: 'project-overview/utvecklingsstrategi-2025' },
      ],
    },
  ],
};

export default sidebars;