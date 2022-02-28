// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ambiorix',
  tagline: 'Web framework for R inspired by express.js',
  url: 'https://ambiorix.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ambiorix',
        logo: {
          alt: 'Ambiorix',
          src: 'img/ambiorix.png',
        },
        items: [
          {to: '/docs/ambiorix', label: 'Package', position: 'left'},
          {to: '/docs/belgic', label: 'Belgic', position: 'left'},
          {to: '/docs/generator', label: 'Generator', position: 'left'},
          {to: '/docs/cli', label: 'CLI', position: 'left'},
          {to: '/docs/middlewares', label: 'Middlewares', position: 'left'},
          {to: '/docs/examples', label: 'Examples', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Ambiorix',
                to: '/docs/ambiorix',
              },
              {
                label: 'Middlewares',
                to: 'docs/ambiorix/middleware',
              },
              {
                label: 'Belgic',
                to: '/docs/belgic',
              },
              {
                label: 'CLI',
                to: '/docs/cli',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/ambiorix',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/devOpifex',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/devOpifex/ambiorix',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['r', 'javascript']
      },
    }),
};

module.exports = config;
