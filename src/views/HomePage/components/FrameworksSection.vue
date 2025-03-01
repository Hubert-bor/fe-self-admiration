<template>
  <section class="frameworks-section" id="frameworks-section">
    <h2>没事的时候过来学点手艺</h2>
    <div class="frameworks-container">
      <!-- 上排 -->
      <div class="framework-row" :style="rowStyle">
        <FrameworkCard v-for="i in numBlocksPerRow + 2" :key="i" />
      </div>

      <!-- 徽标行 -->
      <template v-for="rowIndex in numRows" :key="rowIndex">
        <div class="framework-row" :style="rowStyle">
          <template v-for="columnIndex in numBlocksPerRow + 2" :key="columnIndex">
            <template
              v-if="
                columnIndex - 1 >= centerIndexes[rowIndex].start &&
                columnIndex - 1 < centerIndexes[rowIndex].end
              "
            >
              <FrameworkCard
                :framework="
                  frameworks[
                    (rowIndex - 1) * numFrameworksPerRow +
                      (columnIndex - 1) -
                      centerIndexes[rowIndex].start
                  ]
                "
              />
            </template>
            <template v-else>
              <FrameworkCard />
            </template>
          </template>
        </div>
      </template>

      <!-- 底行 -->
      <div class="framework-row" :style="rowStyle">
        <FrameworkCard v-for="i in numBlocksPerRow + 2" :key="i" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Framework } from './FrameworkCard.vue'
import { computed, type ComputedRef, onMounted, onUnmounted, type Ref, ref } from 'vue'
import { gsap } from 'gsap'
import FrameworkCard from './FrameworkCard.vue'

import logoVue from '@/assets/svgIcon/vue.svg'
import logoJS from '@/assets/svgIcon/js.svg'
import logoHTML from '@/assets/svgIcon/html.svg'
import logoCSS from '@/assets/svgIcon/css.svg'
import logoVite from '@/assets/svgIcon/vite.svg'
import logoNetwork from '@/assets/svgIcon/network.svg'
import logoEngineering from '@/assets/svgIcon/engineering.svg'
import logoReact from '@/assets/svgIcon/react.svg'
import logoVisualization from '@/assets/svgIcon/visualization.svg'
import logoOptimization from '@/assets/svgIcon/optimization.svg'
import logoHandWriting from '@/assets/svgIcon/writing.svg'
import logoProject from '@/assets/svgIcon/project.svg'
import logoTS from '@/assets/svgIcon/ts.svg'
import logoOther from '@/assets/svgIcon/other.svg'

/**
 * @description: 在本节中显示的框架和工具
 */
const frameworks: Framework[] = [
  {
    name: 'Vue',
    logo: logoVue,
    color: '#40b782',
    url: '',
    visible: ref(false)
  },
  {
    name: 'JS',
    logo: logoJS,
    color: '#f5de19',
    url: '',
    visible: ref(false)
  },
  {
    name: 'HTML',
    logo: logoHTML,
    color: '#e14e1d',
    url: '',
    visible: ref(false)
  },
  {
    name: 'CSS',
    logo: logoCSS,
    color: '#0277bd',
    url: '',
    visible: ref(false)
  },
  {
    name: 'TS',
    logo: logoTS,
    color: '#4ab4e3',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Vite',
    logo: logoVite,
    color: '#bd34fe',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Network',
    logo: logoNetwork,
    color: '#2d58d7',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Engineering',
    logo: logoEngineering,
    color: '#ff9800',
    url: '',
    visible: ref(false)
  },
  {
    name: 'HandWriting',
    logo: logoHandWriting,
    color: '#c30f2e',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Project',
    logo: logoProject,
    color: '#00dc82',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Optimization',
    logo: logoOptimization,
    color: '#fbb11c',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Visualization',
    logo: logoVisualization,
    color: '#3f51b5',
    url: '',
    visible: ref(false)
  },
  {
    name: 'React',
    logo: logoReact,
    color: '#00d6fd',
    url: '',
    visible: ref(false)
  },
  {
    name: 'Other',
    logo: logoOther,
    color: '#ffffff',
    url: '',
    visible: ref(false)
  }
]

// 起始参数
const screenWidth: Ref<number> = ref(1920)
let resizeTimeout: ReturnType<typeof setTimeout> | null = null
let timeline: gsap.core.Timeline | null = null

/**
 * @description: 调整大小的事件触发时,更新屏幕宽度
 */
const handleResize = () => {
  screenWidth.value = window.innerWidth
}

/**
 * @description: 节流大小事件处理程序
 */
const throttledResizeHandler = () => {
  if (resizeTimeout === null) {
    resizeTimeout = setTimeout(() => {
      handleResize()
      resizeTimeout = null
    }, 100)
  }
}

onMounted(() => {
  // 设置屏幕的初识尺寸
  handleResize()

  // 监听屏幕的大小变化
  window.addEventListener('resize', throttledResizeHandler)

  // 初始化 GSAP 时间轴; https://gsap.com/docs/v3/GSAP/Timeline/
  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#frameworks-section',
      start: 'top 70%',
      once: true
    }
  })

  frameworks.forEach((framework, index) => {
    timeline!.set(framework.visible, { value: true }, index * 0.05)
  })
})

onUnmounted(() => {
  // 放出节流活动处理程序
  window.removeEventListener('resize', throttledResizeHandler)

  // 清除调整大小处理程序的任何待处理执行
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }

  // 杀死 GSAP 时间轴
  if (timeline) {
    timeline.kill()
    timeline = null
  }
})

/**
 * @description: 一行将有多少个总块（框架或者空）合适？
 */
const numBlocksPerRow: ComputedRef<number> = computed(() => {
  return Math.floor(screenWidth.value / (96 + 24))
})

const paddedBlocksPerSide: ComputedRef<number> = computed(() => {
  if (screenWidth.value < 840) {
    return 0
  }
  if (screenWidth.value < 1280) {
    return 1
  }
  if (screenWidth.value < 1600) {
    return 2
  }
  return Math.max(Math.floor((screenWidth.value - 840) / 280), 0)
})

const numFrameworksPerRow = computed(() => numBlocksPerRow.value - paddedBlocksPerSide.value * 2)

/**
 * @description: 我们需要几行显示所有框架？
 */
const numRows: ComputedRef<number> = computed(() => {
  return Math.ceil(frameworks.length / numFrameworksPerRow.value)
})

/**
 * @description: 支持框架卡的每行块的索引。请注意，返回数组的索引为1个
 */
const centerIndexes: ComputedRef<{ start: number; end: number }[]> = computed(() => {
  // 这个变量存储了每行开始填充框架之前的填充块数量
  const firstRowsStartIndex = paddedBlocksPerSide.value
  // 计算了除了两边填充块之外，每行可以放置的框架数量。
  const frameworksPerFirstRows = numBlocksPerRow.value - 2 * paddedBlocksPerSide.value
  // 计算最后一行的起始索引
  const lastRowStartIndex =
    paddedBlocksPerSide.value +
    Math.floor((frameworksPerFirstRows - (frameworks.length % frameworksPerFirstRows)) / 2)

  // 生成行配置数组
  return new Array(numRows.value + 1).fill(0).map((_, i) => {
    return i < numRows.value || frameworks.length % frameworksPerFirstRows === 0
      ? {
          start: firstRowsStartIndex,
          end: numBlocksPerRow.value - paddedBlocksPerSide.value
        }
      : {
          start: lastRowStartIndex,
          end: lastRowStartIndex + (frameworks.length % frameworksPerFirstRows) + 1
        }
  })
})

/**
 * @description: 为每行生成 CSS 转换，以优雅地滑动水平位置。
 */
const rowStyle: ComputedRef<{ transform: string }> = computed(() => {
  return {
    transform: `translate3d(var(--row-offset),0,0)`
  }
})
</script>

<style lang="less" scoped>
.frameworks-section {
  margin-top: 50px;

  h2 {
    background: linear-gradient(0deg, #fff 0%, rgba(255, 255, 255, 0.76) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 668px;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 3;
  }

  .frameworks-container {
    width: 100%;
    background-color: rgba(38, 38, 38, 0.15);
    position: relative;
    margin-top: -20px;
    overflow: hidden;

    @media (min-width: 840px) {
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        #ffffff 300px,
        #ffffff calc(100vw - 300px),
        transparent 100%
      );
    }

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 80px;
      background: linear-gradient(
        0deg,
        rgba(23, 23, 23, 0) 0%,
        rgba(16, 16, 16, 0.7) 50%,
        #101010 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100px;
      background: linear-gradient(
        180deg,
        rgba(23, 23, 23, 0) 0%,
        rgba(16, 16, 16, 0.7) 50%,
        #101010 100%
      );
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }
  }

  .framework-row {
    display: grid;
    grid-auto-columns: 96px;
    grid-gap: 24px;
    justify-content: flex-start;
    margin-bottom: 24px;
    position: relative;
    white-space: nowrap;
    grid-auto-flow: column;

    &:nth-child(even) {
      --row-offset: 36px;
    }

    &:nth-child(odd) {
      --row-offset: 12px;
    }

    @media (min-width: 1080px) {
      &:nth-child(even) {
        --row-offset: 24px;
      }

      &:nth-child(odd) {
        --row-offset: -24px;
      }
    }
  }
}
</style>
