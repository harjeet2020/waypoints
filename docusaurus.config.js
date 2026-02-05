// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'waypoints',
  tagline: 'A developer journey in slow motion',
  favicon: 'img/favicon.ico',

  // Production URL
  url: 'https://learn.harjeet.dev',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'harjeet',
  projectName: 'learn',

  onBrokenLinks: 'warn',

  // Markdown configuration
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Presets
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Local search
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        indexBlog: false,
      }),
    ],
  ],

  // Theme configuration
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Color mode - light/dark toggle only (no "follow system")
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },

      // Navbar
      navbar: {
        title: 'waypoints',
        logo: {
          alt: 'waypoints',
          src: 'img/logo.svg',
        },
        items: [
          // Algorithms dropdown
          {
            type: 'dropdown',
            label: 'Algorithms',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'algorithmsSidebar',
                label: 'Learning Journey',
              },
              {
                type: 'docSidebar',
                sidebarId: 'algorithmBibleSidebar',
                label: 'Algorithm Bible',
              },
            ],
          },
          // Technical Knowledge dropdown (language deep dives)
          {
            type: 'dropdown',
            label: 'Technical Knowledge',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'javascriptSidebar',
                label: 'JavaScript',
              },
              {
                type: 'docSidebar',
                sidebarId: 'typescriptSidebar',
                label: 'TypeScript',
              },
            ],
          },
          // Journal
          {
            type: 'docSidebar',
            sidebarId: 'journalSidebar',
            position: 'left',
            label: 'Journal',
          },
          // GitHub link (right side)
          {
            href: 'https://github.com/harjeet2020/waypoints',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      // Footer
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Algorithms',
            items: [
              {
                label: 'Learning Journey',
                to: '/algorithms/learning-journey',
              },
              {
                label: 'Algorithm Bible',
                to: '/algorithms/reference',
              },
            ],
          },
          {
            title: 'Technical Knowledge',
            items: [
              {
                label: 'JavaScript',
                to: '/technical-knowledge/javascript',
              },
              {
                label: 'TypeScript',
                to: '/technical-knowledge/typescript',
              },
            ],
          },
          {
            title: 'Journal',
            items: [
              {
                label: 'Browse',
                to: '/journal',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'Portfolio',
                href: 'https://harjeet.dev',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/harjeet2020/waypoints',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Harjeet`,
      },

      // Prism syntax highlighting
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['bash', 'json', 'typescript', 'tsx', 'python', 'java', 'sql', 'cpp'],
      },

      // Table of contents
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

module.exports = config;
