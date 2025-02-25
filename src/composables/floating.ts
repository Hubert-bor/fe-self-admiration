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
  useAttrs,
  watchEffect
} from 'vue'

export function createFloating<T extends Component>(component: Component) {
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

      return () => h('div', { style: style.value }, [h(component, metadata.attrs)])
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
