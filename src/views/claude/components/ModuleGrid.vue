<template>
  <div class="module-grid">
    <div
      v-for="module in modules"
      :key="module.id"
      class="module-card"
      :style="{ '--accent-color': module.color }"
    >
      <div class="module-icon">
        <i :class="`icon-${module.icon}`"></i>
      </div>
      <h3 class="module-title">{{ module.title }}</h3>
      <p class="module-description">{{ module.description }}</p>
      <button class="module-button">探索</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { Module } from '@/types'

export default defineComponent({
  name: 'ModuleGrid',
  props: {
    modules: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.module-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 4px solid var(--accent-color);
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

.module-icon {
  background-color: var(--accent-color);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 1rem;
}

.module-title {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: var(--text-primary);
}

.module-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.module-button {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.module-button:hover {
  background-color: var(--accent-color);
  color: white;
}

@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .module-grid {
    grid-template-columns: 1fr;
  }
}

/* 替代图标的CSS，实际项目可以使用图标库 */
.icon-chart-line::before {
  content: '📊';
}
.icon-users::before {
  content: '👥';
}
.icon-edit::before {
  content: '✏️';
}
.icon-cog::before {
  content: '⚙️';
}
.icon-bell::before {
  content: '🔔';
}
.icon-folder::before {
  content: '📁';
}
</style>
