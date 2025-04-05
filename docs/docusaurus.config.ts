import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'node:fs';
import * as path from 'node:path';

// --- Dynamisk Navbar Logik Start (Behålls som den är) ---
/**
 * Genererar ett läsbart namn från ett katalognamn.
 */
function generateLabel(dirName: string): string {
  if (dirName.toLowerCase() === 'moscow-board') { return 'MoSCoW Översikt'; }
  if (dirName.toLowerCase() === 'status-board') { return 'Status Board'; }
  // Lägg till fler specifika namn här om nödvändigt
  // if (dirName.toLowerCase() === 'ideas-board') { return 'Idéer'; }
  // if (dirName.toLowerCase() === 'priority-board') { return 'Prioriterad Backlog'; }

  // Generell fallback
  return dirName
      .replace(/-/g, ' ') // Ersätt bindestreck med mellanslag
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

/**
 * Hämtar dynamiskt board-länkar från filsystemet för navbar.
 */
function getBoardNavbarItems(): Array<{ to: string; label: string }> {
  const boardsDirPath = path.join(__dirname, 'src/pages/project/project-boards');
  const boardItems: Array<{ to: string; label: string }> = [];
  const excludedDirs = ['overview']; // Mappar att exkludera

  try {
    if (!fs.existsSync(boardsDirPath)) {
      console.warn(`[Navbar] Directory does not exist: ${boardsDirPath}`);
      return [{ label: 'No Boards Found', to: '/' }]; // Fallback
    }

    const entries = fs.readdirSync(boardsDirPath, { withFileTypes: true });
    console.log(`[Navbar] Found ${entries.length} entries in ${boardsDirPath}`);

    for (const entry of entries) {
      if (entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          !entry.name.startsWith('_') &&
          !excludedDirs.includes(entry.name))
      {
        const dirName = entry.name;
        // Försök hitta både .tsx och .mdx som indexfil
        const indexFilePathTSX = path.join(boardsDirPath, dirName, 'index.tsx');
        const indexFilePathMDX = path.join(boardsDirPath, dirName, 'index.mdx');
        let label = generateLabel(dirName); // Använd den genererade labeln som fallback

        // Försök läsa titel från front matter om index.mdx finns
        if (fs.existsSync(indexFilePathMDX)) {
          try {
            const fileContent = fs.readFileSync(indexFilePathMDX, 'utf8');
            // Förbättrad regex för front matter (hanterar kommentarer och olika citattecken)
            const titleMatch = fileContent.match(/^(?:---[\s\S]*?title:\s*(['"]?)(.+?)\1[\s\S]*?---|\btitle:\s*(['"]?)(.+?)\3)/m);
            const matchedTitle = titleMatch ? (titleMatch[2] || titleMatch[4]) : null;
            if (matchedTitle) {
              label = matchedTitle.trim();
              console.log(`[Navbar] Found title "${label}" in ${indexFilePathMDX}`);
            } else {
              console.warn(`[Navbar] No title front matter found in ${indexFilePathMDX}, using generated label.`);
            }
          } catch (e) {
            console.warn(`[Navbar] Error reading front matter from ${indexFilePathMDX}: ${e instanceof Error ? e.message : e}`);
          }
        } else if (!fs.existsSync(indexFilePathTSX)) {
          // Varna om varken index.tsx eller index.mdx finns (sidan kommer inte fungera)
          console.warn(`[Navbar] No index file (index.tsx or index.mdx) found in ${path.join(boardsDirPath, dirName)}`);
          continue; // Hoppa över denna mapp
        }

        boardItems.push({
          label,
          to: `/project/project-boards/${dirName}/`, // Säkerställ avslutande snedstreck
        });
      }
    }

    // Sortera alfabetiskt baserat på label
    boardItems.sort((a, b) => a.label.localeCompare(b.label));

  } catch (error) {
    console.error(`
      -----------------------------------------------------
      ERROR: Kunde inte läsa board-katalogen för Navbar på: ${boardsDirPath}
      Fel: ${error instanceof Error ? error.message : error}
      -----------------------------------------------------
    `);
    // Returnera en fallback eller tom array vid allvarliga fel
    return [{ label: 'Error Loading Boards', to: '/' }];
  }

  // Lägg till länken till översiktssidan sist
  boardItems.push({ label: 'All Boards Overview', to: '/project/project-boards/overview/' }); // Säkerställ avslutande snedstreck
  return boardItems;
}
// --- Dynamisk Navbar Logik Slut ---

const config: Config = {
  title: 'Inner Journey Dokumentation',
  tagline: 'Din guide till att använda och utveckla Inner Journey',
  favicon: 'img/SymbolDark.svg', // Använd .svg om möjligt, annars .ico
  url: 'https://innerdoc.kvarnsmyr.se', // Din produktions-URL
  baseUrl: '/', // Bas-URL för din site

  // GitHub Pages deployment config (om du använder det)
  organizationName: 'joelkvarnsmyr', // Ditt GitHub användarnamn/org
  projectName: 'InnerJourney', // Ditt repo-namn
  trailingSlash: false, // Rekommenderas ofta

  onBrokenLinks: 'ignore', // Ändra till 'throw' i produktion för att fånga trasiga länkar
  onBrokenMarkdownLinks: 'warn', // Bra att ha som 'warn' eller 'throw'

  // Internationalization (i18n)
  i18n: {
    defaultLocale: 'sv',
    locales: ['sv'], // Endast svenska används
    localeConfigs: {
      sv: { label: 'Svenska', direction: 'ltr', htmlLang: 'sv-SE', calendar: 'gregory' },
    },
  },

  // Ladda externa stylesheets
  stylesheets: [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap', type: 'text/css' },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          // Länk för att redigera dokumentation på GitHub
          editUrl: 'https://github.com/joelkvarnsmyr/InnerJourney/edit/main/docs/',
          // Inställningar för i18n för docs
          editLocalizedFiles: true, // Tillåt redigering av översatta filer
        },
        blog: {
          showReadingTime: true,
          // Länk för att redigera blogginlägg
          editUrl: 'https://github.com/joelkvarnsmyr/InnerJourney/edit/main/docs/', // Pekar till docs-mappen? Bör vara blog/
          editLocalizedFiles: true, // Tillåt redigering av översatta filer
          blogTitle: 'Inner Journey Blogg',
          blogDescription: 'Insikter och uppdateringar från Inner Journey-teamet',
          postsPerPage: 10, // Antal inlägg per sida
          // Feed-alternativ
          feedOptions: { type: ['rss', 'atom'], copyright: `Copyright © ${new Date().getFullYear()} Inner Journey` },
          blogSidebarTitle: 'Senaste Inlägg', // Titel i sidomenyn
          blogSidebarCount: 'ALL', // Visa alla inlägg i sidomenyn
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // Använd require.resolve för säker sökväg
        },
        // Lägg till Google Analytics eller GTM här om du använder det
        // gtag: { trackingID: 'G-XXXXXXXXXX', anonymizeIP: true },
        // googleTagManager: { containerId: 'GTM-XXXXXXX' },
      } satisfies Preset.Options,
    ],
  ],

  // Plugins (om du har några utöver presets)
  plugins: [
    // Inkludera ditt lokala plugin om det är aktivt och korrekt
    // path.resolve(__dirname, './plugins/boards-data'),
    // Lägg till andra officiella eller community-plugins här
    // 'docusaurus-plugin-search-local', // Exempel
  ],

  themeConfig: {
    // Bild för sociala medier-delning
    image: 'img/undraw_docusaurus_social_card.svg', // Uppdaterad till SVG-version
    // Navbar-konfiguration
    navbar: {
      logo: {
        alt: 'Inner Journey Logo',
        src: 'img/DarkInnerJourneyLogo.svg',
        srcDark: 'img/lightinnerjourneylogo.svg',
        href: '/',
        target: '_self',
      },
      items: [
        // Ändra från 'docsSidebar' till 'tutorialSidebar'
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Dokumentation' },
        { to: '/blog', label: 'Blogg', position: 'left' },
        { type: 'dropdown', label: 'Boards', position: 'right', items: getBoardNavbarItems() },
        { href: 'https://github.com/joelkvarnsmyr/InnerJourney', label: 'GitHub', position: 'right' },
      ],
    },
    // Footer-konfiguration
    footer: {
      style: 'dark', // Kan vara 'light' eller 'dark'
      links: [ // Strukturera länkar i kolumner
        {
          title: 'Lär dig',
          items: [
            { label: 'Introduktion', to: '/docs/intro' },
            { label: 'Vision', to: '/docs/project-overview/2025-04-01-visionary-foundation-1' },
            { label: 'Teknisk Översikt', to: '/docs/category/technical-specifications' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/2j5a2Gze8W' },
            { label: 'GitHub Discussions', href: 'https://github.com/joelkvarnsmyr/InnerJourney/discussions' },
          ],
        },
        {
          title: 'Mer',
          items: [
            { label: 'Blogg', to: '/blog' },
            { label: 'Huvudapplikation', href: 'https://innerjourney.kvarnsmyr.se' },
            { label: 'Om Oss & Kontakt', to: '/about/partners-and-team' }, // Samlingssida?
          ],
        },
        {
          title: 'Legalt',
          items: [
            // Lägg till länkar till Privacy Policy, Terms of Service etc. här
            // { label: 'Privacy Policy', to: '/privacy' },
            // { label: 'Terms of Use', to: '/terms' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Inner Journey. Built with Docusaurus.`,
    },
    // Prism (Syntax Highlighting) Konfiguration
    prism: {
      theme: prismThemes.github,     // Tema för ljust läge
      darkTheme: prismThemes.dracula, // Tema för mörkt läge
      // Lägg till språk du använder ofta i kodblock för bättre highlighting
      additionalLanguages: ['python', 'typescript', 'javascript', 'css', 'json', 'bash', 'graphql'],
    },
    // Färgtema-växlare
    colorMode: {
      defaultMode: 'light', // Kan vara 'light', 'dark'
      disableSwitch: false, // Tillåt användaren att byta tema
      respectPrefersColorScheme: true, // Respektera användarens OS-inställning
    },
    // Valfritt: Metadata för SEO
    metadata: [
      { name: 'keywords', content: 'Inner Journey, personal development, self-discovery, coaching, AI, meditation, documentation' },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;