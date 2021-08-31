require('esbuild-register')

const Entry1 = [
  {
    text: 'Entry 1',
    link: '/entry1/',
  },
  {
    text: 'Sub entry 1.1',
    link: '/entry1/sub-entry11',
  },
]

const Entry2 = [
  {
    text: 'Entry 2',
    link: '/entry2/',
  },
  {
    text: 'Sub entry 2.1',
    link: '/entry2/sub-entry21',
  },
]

const slidebars = [
  {
    text: 'Entry 1',
    children: Entry1,
  },
  {
    text: 'Entry 2',
    children: Entry2,
  },
]

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: 'Vitepress',
  description: 'Vitepress',
  lang: 'en-US',
  themeConfig: {
    editLinks: false,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Entry 1',
        items: Entry1,
      },
      {
        text: 'Entry 2',
        items: Entry2,
      },
    ],
    sidebar: {
      '/entry1/': slidebars,
      '/entry2/': slidebars,
      '/': slidebars,
    },
  },
}

module.exports = config
