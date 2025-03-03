<template>
  <header class="navbar">
    <div class="container navbar-container">
      <div class="logo">
        <img src="" alt="Logo" class="logo-image" />
        <h1 class="logo-text">Vue3 App</h1>
      </div>

      <nav class="nav-menu" :class="{ active: isMenuOpen }">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a href="#" @click="navigateTo(item.path)">{{ item.name }}</a>
          </li>
        </ul>
      </nav>

      <div class="navbar-right">
        <button class="theme-toggle" @click="$emit('toggle-theme')" aria-label="切换主题">
          <i :class="isDarkTheme ? 'icon-sun' : 'icon-moon'"></i>
        </button>

        <button class="mobile-toggle" @click="toggleMenu" aria-label="菜单">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { NavItem } from '@/types'

export default defineComponent({
  name: 'NavBar',
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-theme'],
  setup() {
    const isMenuOpen = ref(false)

    const navItems = ref<any[]>([
      { id: 1, name: '首页', path: '/' },
      { id: 2, name: '产品', path: '/products' },
      { id: 3, name: '服务', path: '/services' },
      { id: 4, name: '关于', path: '/about' },
      { id: 5, name: '联系我们', path: '/contact' }
    ])

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const navigateTo = (path: string) => {
      console.log(`导航到: ${path}`)
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      navItems,
      toggleMenu,
      navigateTo
    }
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--bg-primary);
  box-shadow: 0 2px 10px var(--shadow-color);
  z-index: 1000;
  height: 60px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 32px;
  width: auto;
  margin-right: 12px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-color);
  margin: 0;
}

.nav-menu ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  display: block;
  padding: 0 1rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 60px;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: var(--accent-color);
}

.navbar-right {
  display: flex;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
  transition: color 0.3s;
}

.theme-toggle:hover {
  color: var(--accent-color);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: var(--text-primary);
  transition: all 0.3s;
}

.icon-sun::before {
  content: '☀️';
}

.icon-moon::before {
  content: '🌙';
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: var(--bg-primary);
    box-shadow: 0 5px 10px var(--shadow-color);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-menu.active {
    max-height: 300px;
  }

  .nav-menu ul {
    flex-direction: column;
  }

  .nav-menu li {
    width: 100%;
  }

  .nav-menu a {
    line-height: 50px;
    padding: 0 2rem;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
