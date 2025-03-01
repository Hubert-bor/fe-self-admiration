<template>
  <div class="app" :class="{ 'dark-theme': isDarkTheme }">
    <NavBar @toggle-theme="toggleTheme" :isDarkTheme="isDarkTheme" />
    <main>
      <section class="hero">
        <div class="container">
          <h1>欢迎来到我们的网站</h1>
          <p>探索我们精心设计的模块，获取您需要的所有信息</p>
        </div>
      </section>

      <section class="modules-section">
        <div class="container">
          <h2>我们的模块</h2>
          <ModuleGrid :modules="modules" />
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2>产品特点</h2>
          aaa
          <!-- <FeaturesDisplay :features="features" /> -->
        </div>
      </section>

      <section class="testimonials-section">
        <div class="container">
          <h2>用户反馈</h2>
          <TestimonialCarousel :testimonials="testimonials" />
        </div>
      </section>
    </main>
    
    <!-- <AppFooter /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '@/views/claude/components/NavBar.vue'
import ModuleGrid from '@/views/claude/components/ModuleGrid.vue'
// import FeaturesDisplay from '@/components/FeaturesDisplay.vue'
import TestimonialCarousel from '@/views/claude/components/TestimonialCarousel.vue'
// import AppFooter from '@/components/AppFooter.vue'
// import { Module, Feature, Testimonial } from '@/types'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    ModuleGrid,
    // FeaturesDisplay,
    TestimonialCarousel
    // AppFooter
  },
  setup() {
    // 存储当前主题状态
    const isDarkTheme = ref(localStorage.getItem('theme') === 'dark')

    // 切换主题的函数
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value
      localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
    }

    // 模块数据
    const modules = ref<any[]>([
      {
        id: 1,
        title: '数据分析',
        description: '强大的数据分析工具，帮助您做出明智的决策',
        icon: 'chart-line',
        color: '#4CAF50'
      },
      {
        id: 2,
        title: '用户管理',
        description: '高效管理用户权限与数据',
        icon: 'users',
        color: '#2196F3'
      },
      {
        id: 3,
        title: '内容创作',
        description: '简单易用的内容创建工具',
        icon: 'edit',
        color: '#FF9800'
      },
      {
        id: 4,
        title: '系统设置',
        description: '个性化您的应用程序体验',
        icon: 'cog',
        color: '#9C27B0'
      },
      {
        id: 5,
        title: '消息中心',
        description: '集中管理所有通知和消息',
        icon: 'bell',
        color: '#E91E63'
      },
      {
        id: 6,
        title: '资源库',
        description: '访问和管理您的所有资源',
        icon: 'folder',
        color: '#607D8B'
      }
    ])

    // 特点数据
    const features = ref<any[]>([
      {
        id: 1,
        title: '响应式设计',
        description: '在任何设备上都能获得完美体验'
      },
      {
        id: 2,
        title: '主题切换',
        description: '支持明暗两种主题，呵护您的视觉体验'
      },
      {
        id: 3,
        title: '高性能',
        description: '优化的代码确保页面加载迅速'
      }
    ])

    // 用户反馈数据
    const testimonials = ref<any[]>([
      {
        id: 1,
        name: '张先生',
        company: 'ABC科技',
        content: '这个系统让我们的工作效率提高了30%，界面设计也很人性化！'
      },
      {
        id: 2,
        name: '李女士',
        company: '创新设计工作室',
        content: '作为设计师，我非常喜欢这个平台的视觉体验和交互设计。'
      },
      {
        id: 3,
        name: '王总',
        company: '未来科技',
        content: '我们团队使用这个系统后，协作变得更加顺畅，强烈推荐！'
      }
    ])

    return {
      isDarkTheme,
      toggleTheme,
      modules,
      features,
      testimonials
    }
  }
})
</script>

<style>
:root {
  /* 亮色主题变量 */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --text-primary: #333333;
  --text-secondary: #666666;
  --accent-color: #3498db;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.dark-theme {
  /* 暗色主题变量 */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --accent-color: #64b5f6;
  --border-color: #333333;
  --shadow-color: rgba(0, 0, 0, 0.5);
}

.app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

main {
  padding-top: 60px;
}

section {
  padding: 3rem 0;
}

@media (max-width: 768px) {
  section {
    padding: 2rem 0;
  }
}

h1,
h2,
h3 {
  margin-top: 0;
}

.hero {
  background-color: var(--bg-secondary);
  padding: 5rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }
}
</style>
