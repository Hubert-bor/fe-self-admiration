<template>
  <component
    :is="props.framework.url ? 'a' : 'div'"
    :href="props.framework.url ? props.framework.url : undefined"
    target="_blank"
    rel="noopener"
    class="framework-card"
    :style="{ '--glow-color': props.framework.color }"
    :class="{ active: props.framework.visible.value === true }"
    @click="props.framework.logo && router.push('/question')"
  >
    <img v-if="props.framework.logo" :src="props.framework.logo" :alt="props.framework.name" />
  </component>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'

/**
 * 单个框架或工具在框架部分显示
 */
export interface Framework {
  /**
   * 框架的名称。
   */
  name?: string

  /**
   * 以SVG格式表示徽标URL的字符串。
   */
  logo?: string

  /**
   * 代表发光效果的十六进制颜色的弦。
   */
  color?: string

  /**
   * 代表框架/工具主页的URL的字符串。
   */
  url?: string

  /**
   * 是否可见框架卡。
   */
  visible: Ref<boolean>
}

interface Props {
  framework?: Framework
}

const props = withDefaults(defineProps<Props>(), {
  framework: (): Framework => ({
    visible: ref(true)
  })
})

const router = useRouter()
</script>

<style scoped>
.framework-card {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  border: 1px solid rgba(38, 38, 38, 0.7);
  background: #181818;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  --glow-color: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 0.4s ease;
  user-select: none;

  img {
    user-select: none;
    filter: drop-shadow(0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent));
  }

  .framework-icon {
    border: 1px solid red;
    width: 100%;
    height: 100%;
  }

  &.active {
    opacity: 1;
  }
}

.framework-card:not(:has(img)) {
  transform: scale(1) translate3d(0, 0, 0);
  transition: transform 3s ease;

  &:hover {
    transform: scale(0.9) translate3d(0, 0, 0);
    transition: transform 0.2s ease-in-out;
  }
}

.framework-card:has(img) {
  cursor: pointer;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background-color: var(--glow-color);
    filter: blur(18px);
    z-index: -1;
    opacity: 0;
    transition: opacity 3s ease;
    will-change: opacity;
  }

  &:hover {
    &:before {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
  }
}
</style>
