import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config

export default async () => {
  return defineConfig({
    title: '九阳真经',
    description: '山不让尘，川不辞盈',
    outDir: './.vitepress/docsDist',
    base: '/docs/', // 部署站点的基础路径，配合nginx配置使用
    assetsDir: 'static',
    markdown: {
      container: {
        tipLabel: '提示',
        warningLabel: '警告',
        dangerLabel: '危险',
        infoLabel: '信息',
        detailsLabel: '详细信息'
      }
    },
    themeConfig: {
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部',
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '主页', link: '/' }
        // { text: 'Examples', link: '/markdown-examples' }
      ],
      // sidebar: [
      //   {
      //     text: 'Examples',
      //     items: [
      //       { text: 'Markdown Examples', link: '/markdown-examples' },
      //       { text: 'Runtime API Examples', link: '/api-examples' }
      //     ]
      //   }
      // ],
      socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    },
    vite: {
      resolve: {
        alias: [
          {
            find: /^.*\/VPSidebarItem\.vue$/, // 重写 VPSidebarItem 组件
            replacement: fileURLToPath(new URL('./theme/components/VPSidebarItem.vue', import.meta.url))
          },
          {
            find: /^.*\/VPSidebar\.vue$/, // 重写 VPSidebar 组件
            replacement: fileURLToPath(new URL('./theme/components/VPSidebar.vue', import.meta.url))
          },
          {
            find: /^.*\/VPNavBarTitle\.vue$/, // 重写 VPNavBarTitle 组件
            replacement: fileURLToPath(new URL('./theme/components/VPNavBarTitle.vue', import.meta.url))
          },
          {
            find: /^.*\/VPNavBar\.vue$/, // 重写 VPNavBar 组件
            replacement: fileURLToPath(new URL('./theme/components/VPNavBar.vue', import.meta.url))
          }
        ]
      },
      server: {
        proxy: {
          '/api': {
            // 代理 /api/* 到 http://xbtimm.top:8080/api/*
            target: 'http://xbtimm.top:8080/api',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    }
  })
}
