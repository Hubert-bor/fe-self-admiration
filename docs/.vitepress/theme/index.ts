import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'aside-outline-before': () => h(AsideOutlineBefore),
      // 'sidebar-nav-before': () => h(SidebarNavBefore),
      // 'sidebar-nav-after': () => h(SidebarNavAfter)
    })
  }
}
