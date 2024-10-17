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
            'https://github.com/ambiorix-web/ambiorix-site/tree/main/',
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
            href: 'https://github.com/ambiorix-web/ambiorix',
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
                href: 'https://twitter.com/ambiorix-web',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ambiorix-web/ambiorix',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ambiorix`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['r', 'javascript', 'bash']
      },
      image: '/img/banner.png',
      metadata: [
        {name: 'keywords', content: 'ambiorix,r,rstats,web framework'},
        {name: 'description', content: 'Web framework for the R programming language, inspired by express.js, allows building applications as well as APIs.'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@ambiorix-web'},
        {name: 'twitter:creator', content: '@JohnCoene'},
        {name: 'twitter:title', content: 'Ambiorix'},
        {name: 'twitter:image', content: 'https://ambiorix.dev/img/banner.png'},
        {name: 'twitter:description', content: 'Web framework for the R programming language, inspired by express.js, allows building applications as well as APIs.'},
        {name: 'og:title', content: 'Ambiorix'},
        {name: 'og:description', content: 'Web framework for the R programming language, inspired by express.js, allows building applications as well as APIs.'},
        {name: 'og:url', content: 'https://ambiorix.dev/'},
      ],
    }),
};

module.exports = config;
