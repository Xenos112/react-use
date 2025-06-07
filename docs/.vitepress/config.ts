import { defineConfig } from 'vitepress'

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
          { text: 'useAsyncState', link: '/hooks/use-async-state' },
          { text: 'useClipboard', link: '/hooks/use-clipboard' },
          { text: 'useDraggable', link: '/hooks/use-draggable' },
          { text: 'useElementBounding', link: '/hooks/use-element-bounding' },
          { text: 'useElementSize', link: '/hooks/use-element-size' },
          { text: 'useElementVisibility', link: '/hooks/use-element-visibility' },
          { text: 'useEvent', link: '/hooks/use-event' },
          { text: 'useIdle', link: '/hooks/use-idle' },
          { text: 'useImage', link: '/hooks/use-image' },
          { text: 'useLocalStorage', link: '/hooks/use-local-storage' },
          { text: 'useMounted', link: '/hooks/use-mounted' },
          { text: 'useMouse', link: '/hooks/use-mouse' },
          { text: 'useMouseElement', link: '/hooks/use-mouse-element' },
          { text: 'useObjectUrl', link: '/hooks/use-object-url' },
          { text: 'useOnline', link: '/hooks/use-online' },
          { text: 'useSessionStorage', link: '/hooks/use-session-storage' },
          { text: 'useSupported', link: '/hooks/use-supported' },
          { text: 'useTitle', link: '/hooks/use-title' },
          { text: 'useWindowScroll', link: '/hooks/use-window-scroll' },
          { text: 'useWindowSize', link: '/hooks/use-window-size' },
        ],
      },
    ],
    footer: {
      message: 'made with ❤️ by Xenos',
      copyright: '',
    },
  },
})
