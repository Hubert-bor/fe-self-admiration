import { useMediaQuery } from '@vueuse/core'
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from 'vitepress'
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  watchEffect,
  watchPostEffect,
  type ComputedRef,
  type Ref
} from 'vue'
import { isActive } from '../shared/shared'
import { hasActiveLink as containsActiveLink, getSidebar, getSidebarGroups } from './supportSidebar'
import axios from 'axios'

export interface SidebarControl {
  collapsed: Ref<boolean>
  collapsible: ComputedRef<boolean>
  isLink: ComputedRef<boolean>
  isActiveLink: Ref<boolean>
  hasActiveLink: ComputedRef<boolean>
  hasChildren: ComputedRef<boolean>
  toggle(): void
}

const dynamicSidebar = ref<DefaultTheme.SidebarItem[]>([])

export function useSidebar() {
  const { frontmatter, page, theme } = useData()
  const is960 = useMediaQuery('(min-width: 960px)')

  const isOpen = ref(false)

  const _sidebar = computed(() => {
    const sidebarConfig = theme.value.sidebar
    const relativePath = page.value.relativePath
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : dynamicSidebar.value
  })

  const sidebar = ref(_sidebar.value)

  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev)) sidebar.value = _sidebar.value
  })

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false &&
      sidebar.value.length > 0 &&
      frontmatter.value.layout !== 'home'
    )
  })

  const leftAside = computed(() => {
    if (hasAside.value)
      return frontmatter.value.aside == null
        ? theme.value.aside === 'left'
        : frontmatter.value.aside === 'left'
    return false
  })

  const hasAside = computed(() => {
    if (frontmatter.value.layout === 'home') return false
    if (frontmatter.value.aside != null) return !!frontmatter.value.aside
    return theme.value.aside !== false
  })

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value)

  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : []
  })

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  }
}

/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
export function useCloseSidebarOnEscape(isOpen: Ref<boolean>, close: () => void) {
  let triggerElement: HTMLButtonElement | undefined

  watchEffect(() => {
    triggerElement = isOpen.value ? (document.activeElement as HTMLButtonElement) : undefined
  })

  onMounted(() => {
    window.addEventListener('keyup', onEscape)
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', onEscape)
  })

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen.value) {
      close()
      triggerElement?.focus()
    }
  }
}

export function useSidebarControl(item: ComputedRef<DefaultTheme.SidebarItem>): SidebarControl {
  const { page, hash } = useData()

  const collapsed = ref(false)

  const collapsible = computed(() => {
    return item.value.collapsed != null
  })

  const isLink = computed(() => {
    return !!item.value.link
  })

  const isActiveLink = ref(false)
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link)
  }

  watch([page, item, hash], updateIsActiveLink)
  onMounted(updateIsActiveLink)

  const hasActiveLink = computed(() => {
    if (isActiveLink.value) {
      return true
    }

    return item.value.items ? containsActiveLink(page.value.relativePath, item.value.items) : false
  })

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length)
  })

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed)
  })

  watchPostEffect(() => {
    ;(isActiveLink.value || hasActiveLink.value) && (collapsed.value = false)
  })

  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value
    }
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle
  }
}

export interface Question {
  answer: string
  createAt: string
  id: number
  title: string
  type: string
  updateAt: string
}

/**
 * @description: 获取动态侧边栏
 */
export async function dynamicGetSidebar(): Promise<DefaultTheme.SidebarItem[]> {
  const res = await axios.get('/api/questions')
  console.log('res', res)
  const questionType = document.location.search.split('?')[1].split('=')[1]

  dynamicSidebar.value = [
    {
      text: questionType || '暂无类型',
      items: (res?.data?.data || [])
        .filter((item) => {
          return item.type === questionType
        })
        .map((item: Question) => {
          return {
            text: item.title,
            link: item.id.toString()
          }
        })
    }
  ]

  return unref(dynamicSidebar)
}
