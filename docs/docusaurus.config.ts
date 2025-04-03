// docusaurus.config.js
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// --- Dynamisk Navbar Logik Start ---
import * as fs from 'node:fs'; // Använd node:fs för modern Node.js
import * as path from 'node:path';

/**
 * Genererar ett läsbart namn från ett katalognamn.
 * Exempel: 'moscow' -> 'Moscow', 'prioritized-backlog' -> 'Prioritized Backlog'
 */
function generateLabel(dirName: string): string {
  // Specialfall för MoSCoW för korrekt versalisering
  if (dirName.toLowerCase() === 'moscow') {
    return 'MoSCoW Översikt'; // Återanvänd din befintliga label
  }

  return dirName
      .split('-') // Dela vid bindestreck
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Gör första bokstaven stor
      .join(' '); // Sammanfoga med mellanslag
}

/**
 * Hämtar dynamiskt board-länkar från filsystemet.
 */
function getBoardNavbarItems(): { to: string; label: string }[] {
  const boardsDirPath = path.join(__dirname, 'src/pages/boards');
  let boardItems = [];

  try {
    const entries = fs.readdirSync(boardsDirPath, { withFileTypes: true });
    boardItems = entries
        .filter(entry =>
            entry.isDirectory() && // Måste vara en katalog
            !entry.name.startsWith('.') && // Ignorera dolda filer/mappar
            !entry.name.startsWith('_') // Ignorera mappar som börjar med _ (konvention för partiella/interna)
        )
        .map(dir => {
          const dirName = dir.name;
          return {
            label: generateLabel(dirName),
            // Skapar länken baserat på mappnamnet.
            // Förväntar sig /src/pages/boards/dirname/index.tsx (eller .mdx)
            to: `/boards/${dirName}/`,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label)); // Sortera alfabetiskt för konsekvens

  } catch (error) {
    // Logga ett varnande meddelande om mappen inte kan läsas
    console.warn(`
      -----------------------------------------------------
      WARN: Kunde inte läsa board-katalogen på: ${boardsDirPath}
      Den dynamiska 'Boards'-dropdownen kommer vara tom eller ofullständig.
      Fel: ${error.message}
      -----------------------------------------------------
    `);
    // Returnera en tom array eller en fallback om du vill
    return [];
  }

  // Lägg eventuellt till en statisk länk till en översiktssida för alla boards
  // Om du har en sida /src/pages/boards/index.tsx eller /src/pages/boards.tsx
  boardItems.push({ label: 'Alla Boards Översikt', to: '/boards' });

  return boardItems;
}
// --- Dynamisk Navbar Logik Slut ---


const config: Config = {
  title: 'Inner Journey Dokumentation',
  tagline: 'Din guide till att använda och utveckla Inner Journey',
  favicon: 'img/SymbolDark.svg',
  url: 'https://innerdoc.kvarnsmyr.se',
  baseUrl: '/',
  // ... (resten av dina grundinställningar: onBrokenLinks, i18n, etc.) ...
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'sv',
    locales: ['sv'],
    localeConfigs: {
      sv: {
        label: 'Svenska',
        direction: 'ltr',
        htmlLang: 'sv-SE',
        calendar: 'gregory',
      },
    },
  },
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
      type: 'text/css',
    },
  ],

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
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/joelkvarnsmyr/InnerJourney/edit/main/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarTitle: 'Senaste blogginlägg',
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
      // ... (logo, andra items) ...
      logo: {
        alt: 'Inner Journey Logo',
        src: 'img/DarkInnerJourneyLogo.svg',
        srcDark: 'img/lightinnerjourneylogo.svg',
        href: '/',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Dokumentation',
        },
        { to: '/blog', label: 'Blogg', position: 'left' },
        // --- Dynamisk Dropdown ---
        {
          type: 'dropdown',
          label: 'Boards',
          position: 'right',
          // Anropa funktionen här för att få de dynamiska objekten
          items: getBoardNavbarItems(),
        },
        // --- Slut Dynamisk Dropdown ---
        {
          href: 'https://github.com/joelkvarnsmyr/InnerJourney',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // ... (resten av din themeConfig: footer, prism, colorMode) ...
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            {
              label: 'Introduktion',
              to: '/docs/intro',
            },
            {
              label: 'Användarupplevelse',
              to: '/docs/category/user-experience',
            },
            {
              label: 'Teknisk Dokumentation',
              to: '/docs/category/development',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/joelkvarnsmyr/InnerJourney',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/2j5a2Gze8W',
            },
          ],
        },
        {
          title: 'Mer',
          items: [
            {
              label: 'Blogg',
              to: '/blog',
            },
            {
              label: 'Inner Journey App',
              href: 'https://innerjourney.kvarnsmyr.se',
            },
            {
              label: 'Bli en del av Inner Journey',
              to: '/coaches',
            },
            {
              label: 'Investeringsmöjligheter',
              to: '/investeringsmojligheter',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Inner Journey. Byggd med Docusaurus.`,
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

// Exportera konfigurationen
export default config; // Eller module.exports = config; om du inte använder ESM syntax här.