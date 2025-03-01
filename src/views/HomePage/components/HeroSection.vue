<template>
  <div class="hero">
    <div class="container">
      <!-- 标题 -->
      <h1>路虽远行则将至<br />事虽难做则必成</h1>
      <!-- 标语 -->
      <h3>我渐渐把“这种事为什么要发生在我身上”的想法替换成了“这种事想教会我什么”</h3>

      <!-- 开始按钮 -->
      <div class="hero-ctions">
        <a class="btn btn--primary" @click="router.push('/add')">开始</a>
      </div>
    </div>

    <!-- 动视图 -->
    <HeroDiagram />
  </div>
</template>

<script setup lang="ts">
import '../../../styles/landing.css'
// import HeroDiagram from './HeroDiagram.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
  background-color: #101010;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 902px;
  margin: 60px auto 0;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    margin: 95px auto 0;
  }
}

.hero-ctions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}
</style>
