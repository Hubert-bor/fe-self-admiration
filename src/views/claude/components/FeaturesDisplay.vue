<template>
  <div class="features-container">
    <div v-for="feature in features" :key="feature.id" class="feature-item">
      <div class="feature-number">{{ feature.id }}</div>
      <h3 class="feature-title">{{ feature.title }}</h3>
      <p class="feature-description">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { Feature } from '@/types'

export default defineComponent({
  name: 'FeaturesDisplay',
  props: {
    features: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.feature-item {
  flex: 1 1 300px;
  position: relative;
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-number {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px;
  height: 40px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.feature-title {
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-container {
    flex-direction: column;
  }

  .feature-item {
    flex: 1 1 100%;
  }
}
</style>
