import { nanoid } from 'nanoid'
import { createStarportContext } from './context'
import { computed, defineComponent, type StyleValue} from 'vue'
import { useRouter } from 'vue-router'

export function createStarport<T extends Componet>(component: T, options: any = {}) {
  const resolved: any = {
    duration: 800,
    ...options
  }

  const defaultId = nanoid()
  const portMap = new Map<string, any>()

  function getContext(port = defaultId) {
    if (!portMap.has(port)) {
      portMap.set(port, createStarportContext())
    }

    return portMap.get(port)
  }

  const container = defineComponent({
    props: {
      port: {
        type: String,
        default: defaultId
      }
    },
    setup(props) {
      const router = useRouter()
      const context = computed(() => getContext(props.port))

      const style = computed((): StyleValue => {
        const rect = context.value.rect
        const style: StyleValue = {
          position: 'fixed',
          left: `${rect.x ?? 0}px`,
          top: `${rect.y ?? 0}px`,
          width: `${rect.width ?? 0}px`,
          height: `${rect.height ?? 0}px`
        }

        if (!context.value.isVisible || !context.value.el) {
          return {
            ...style,
            display: 'none'
          }
        }

        if (context.value.isLanded) {
          style.pointerEvents = 'none'
        } else {
          style.transition = `all ${resolved.duration}ms ease-in-out`
        }

        return style
      })
    }
  })
}
