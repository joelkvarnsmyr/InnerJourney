// docusaurus.config.ts
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as path from 'node:path';
import * as fs from 'node:fs';

// --- Dynamisk Navbar Logik Start ---
/**
 * Genererar ett läsbart namn från ett katalognamn.
 * Exempel: 'moscow-board' -> 'MoSCoW Overview', 'status-board' -> 'Status Board'
 */
function generateLabel(dirName: string): string {
  if (dirName.toLowerCase() === 'moscow-board') {
    return 'MoSCoW Overview';
  }
  if (dirName.toLowerCase() === 'status-board') {
    return 'Status Board';
  }
  if (dirName.toLowerCase() === 'ideas-board') {
    return 'Ideas Board';
  }
  return dirName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

/**
 * Hämtar dynamiskt board-länkar från filsystemet för navbar.
 * @returns En array av objekt med `to` och `label` för varje board.
 */
function getBoardNavbarItems(): Array<{ to: string; label: string }> {
  const boardsDirPath = path.join(__dirname, 'src/pages/project/project-boards');
  const boardItems: Array<{ to: string; label: string }> = [];

  try {
    if (!fs.existsSync(boardsDirPath)) {
      console.warn(`[Navbar] Directory does not exist: ${boardsDirPath}`);
      return boardItems;
    }

    const entries = fs.readdirSync(boardsDirPath, { withFileTypes: true });
    console.log(`[Navbar] Found ${entries.length} entries in ${boardsDirPath}`);

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_') && entry.name !== 'overview') {
        const dirName = entry.name;
        const indexFilePathMDX = path.join(boardsDirPath, dirName, 'index.mdx');
        let label = generateLabel(dirName);

        if (fs.existsSync(indexFilePathMDX)) {
          try {
            const fileContent = fs.readFileSync(indexFilePathMDX, 'utf8');
            const titleMatch = fileContent.match(/^title:\s*['"]?([^'"\n]+)['"]?/m);
            if (titleMatch && titleMatch[1]) {
              label = titleMatch[1];
            }
          } catch (e) {
            console.warn(`[Navbar] Error reading front matter from ${indexFilePathMDX}: ${e instanceof Error ? e.message : e}`);
          }
        }

        boardItems.push({
          label,
          to: `/project/project-boards/${dirName}/`,
        });
      }
    }

    boardItems.sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.warn(`
      -----------------------------------------------------
      WARN: Kunde inte läsa board-katalogen för Navbar på: ${boardsDirPath}
      Fel: ${error instanceof Error ? error.message : error}
      -----------------------------------------------------
    `);
    return [];
  }

  boardItems.push({ label: 'All Boards Overview', to: '/project/project-boards/overview' });
  return boardItems;
}
// --- Dynamisk Navbar Logik Slut ---

const config: Config = {
  title: 'Inner Journey Documentation',
  tagline: 'Your guide to using and developing Inner Journey',
  favicon: 'img/SymbolDark.svg',
  url: 'https://innerdoc.kvarnsmyr.se',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      sv: { label: 'Svenska', direction: 'ltr' },
    },
  },
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
      type: 'text/css',
    },
  ],

  plugins: [], // Tog bort boardsDataPlugin

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/joelkvarnsmyr/InnerJourney/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/joelkvarnsmyr/InnerJourney/edit/main/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarTitle: 'Recent Blog Posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'Inner Journey Logo',
        src: 'img/DarkInnerJourneyLogo.svg',
        srcDark: 'img/lightinnerjourneylogo.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'dropdown',
          label: 'Boards',
          position: 'right',
          items: getBoardNavbarItems(),
        },
        { href: 'https://github.com/joelkvarnsmyr/InnerJourney', label: 'GitHub', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'User Experience', to: '/docs/category/user-experience' },
            { label: 'Technical Documentation', to: '/docs/category/technical-specifications' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/joelkvarnsmyr/InnerJourney' },
            { label: 'Discord', href: 'https://discord.gg/2j5a2Gze8W' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'Inner Journey App', href: 'https://innerjourney.kvarnsmyr.se' },
            { label: 'Become a Coach', to: '/about/coaches' },
            { label: 'Investment Opportunities', to: '/about/investment-opportunities' },
            { label: 'Work with Us', to: '/about/partners-and-team' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Inner Journey.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;