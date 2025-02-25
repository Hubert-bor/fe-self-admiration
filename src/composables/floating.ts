import { useElementBounding } from '@vueuse/core'
import type { Component, StyleValue } from 'vue'

import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  Teleport,
  useAttrs,
  watch
} from 'vue'

export interface FloatingOptions {
  duration?: number
}

export function createFloating<T extends Component>(component: T, options: FloatingOptions = {}) {
  const { duration = 500 } = options

  const metadata = reactive<any>({
    props: {},
    attrs: {}
  })

  const proxyEl = ref<HTMLElement | null>()

  const container = defineComponent({
    setup() {
      // const rect = ref<DOMRect | null>()
      const rect = reactive<any>(useElementBounding(proxyEl))

      const style = computed((): StyleValue => {
        const fixed: StyleValue = {
          transition: 'all .5s ease-in-out',
          transitionDuration: `${duration}ms`,

          position: 'fixed'
        }

        if (!rect || !proxyEl.value) {
          return {
            ...fixed,
            opacity: 0
          }
        }

        return {
          ...fixed,
          left: `${rect.left ?? 0}px`,
          top: `${rect.top ?? 0}px`
        }
      })

      // function update() {
      //   rect.value = proxyEl.value?.getBoundingClientRect()
      // }

      // useMutationObserver(proxyEl, update, {
      //   childList: true,
      //   subtree: true,
      //   attributes: true,
      //   characterData: true
      // })
      // useEventListener('reset', update)
      // watchEffect(update)

      const landed = ref(false)
      let loading: any

      function liftOff() {
        landed.value = false
      }

      function land() {
        landed.value = true
      }

      watch(proxyEl, (el) => {
        liftOff()
        if (el) {
          clearTimeout(loading)
          loading = setTimeout(() => {
            land()
          }, duration)
        }
      })

      return () => {
        const children = [h(component, metadata.attrs)]

        return landed.value && proxyEl.value
          ? h(Teleport, { to: proxyEl.value }, children)
          : h('div', { style: style.value }, children)
      }
    }
  })

  const proxy = defineComponent({
    setup(props, ctx) {
      const attrs = useAttrs()
      const el = ref<HTMLElement>()

      metadata.attrs = attrs

      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
        proxyEl.value = undefined
      })

      return () => h('div', { ref: el }, [ctx.slots.default ? h(ctx.slots.default) : null])
    }
  })

  return {
    container,
    proxy
  }
}
