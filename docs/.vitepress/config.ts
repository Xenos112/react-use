import { defineConfig } from 'vitepress'
import listHooks from '../../scripts/list-hooks'

const hooks = listHooks()

export default defineConfig({
  title: 'Use Reacty',
  description: 'A collection of React hooks',
  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: '/logo.png',
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/get-started' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          ...hooks.map(hook => ({
            text: hook,
            link: `/hooks/${hook}`,
          })),
        ],
      },
    ],
    footer: {
      message: 'made with ❤️ by Xenos',
      copyright: '',
    },
  },
})
