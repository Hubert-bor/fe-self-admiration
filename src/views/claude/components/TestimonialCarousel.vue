<template>
  <div class="testimonials-carousel">
    <div class="carousel-container" ref="carouselRef">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
        <div class="testimonial-content">
          <p>"{{ testimonial.content }}"</p>
        </div>
        <div class="testimonial-author">
          <strong>{{ testimonial.name }}</strong>
          <span>{{ testimonial.company }}</span>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button @click="prevSlide" class="control-button">&lt;</button>
      <div class="carousel-dots">
        <span
          v-for="(_, index) in testimonials"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
      <button @click="nextSlide" class="control-button">&gt;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
// import { Testimonial } from '@/types'

export default defineComponent({
  name: 'TestimonialCarousel',
  props: {
    testimonials: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const carouselRef = ref<HTMLElement | null>(null)
    const currentSlide = ref(0)
    let autoplayInterval: number | null = null

    const prevSlide = () => {
      currentSlide.value =
        currentSlide.value === 0 ? props.testimonials.length - 1 : currentSlide.value - 1
      updateCarouselPosition()
    }

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % props.testimonials.length
      updateCarouselPosition()
    }

    const goToSlide = (index: number) => {
      currentSlide.value = index
      updateCarouselPosition()
    }

    const updateCarouselPosition = () => {
      if (carouselRef.value) {
        const slideWidth = carouselRef.value.offsetWidth
        carouselRef.value.style.transform = `translateX(-${currentSlide.value * slideWidth}px)`
      }
    }

    const startAutoplay = () => {
      stopAutoplay()
      autoplayInterval = window.setInterval(() => {
        nextSlide()
      }, 5000) // 5秒切换一次
    }

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
    }

    const handleResize = () => {
      updateCarouselPosition()
    }

    onMounted(() => {
      startAutoplay()
      window.addEventListener('resize', handleResize)
      updateCarouselPosition()
    })

    onBeforeUnmount(() => {
      stopAutoplay()
      window.removeEventListener('resize', handleResize)
    })

    return {
      carouselRef,
      currentSlide,
      prevSlide,
      nextSlide,
      goToSlide
    }
  }
})
</script>

<style scoped>
.testimonials-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 2rem;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  min-width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.testimonial-content {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  color: var(--text-secondary);
}

.testimonial-author strong {
  color: var(--accent-color);
  margin-bottom: 0.25rem;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

.control-button {
  background-color: var(--bg-secondary);
  border: none;
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.control-button:hover {
  background-color: var(--accent-color);
  color: white;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin: 0 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--border-color);
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background-color: var(--accent-color);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .testimonial-card {
    padding: 1.5rem;
  }

  .testimonial-content {
    font-size: 1rem;
  }
}
</style>
