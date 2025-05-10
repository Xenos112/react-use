import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'React Use',
  description: 'A collection of React hooks',
  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: '/logo.png',
    nav: [{ text: 'Home', link: '/' }],
    footer: {
      message: 'made with ❤️ by Xenos',
      copyright: '',
    },
  },
})
