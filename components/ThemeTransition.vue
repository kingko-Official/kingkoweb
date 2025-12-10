<template>
  <div
    v-if="isTransitioning"
    class="theme-transition-overlay"
    :class="{ 'to-dark': transitionToDark }"
    :style="{ '--circle-radius': circleRadius + 'px' }"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isDark: boolean
}>()

const isTransitioning = ref(false)
const transitionToDark = ref(false)
const circleRadius = ref(0)

// Calculate the maximum radius needed to cover the entire screen from top-right corner
const getMaxRadius = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  // Distance from top-right corner to bottom-left corner (furthest point)
  return Math.sqrt(width * width + height * height)
}

// Watch for theme changes
watch(() => props.isDark, (newValue) => {
  transitionToDark.value = newValue
  isTransitioning.value = true
  circleRadius.value = 0
  
  // Animate the circle radius
  const maxRadius = getMaxRadius()
  const duration = 1000 // 1 second
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Ease-out cubic for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    circleRadius.value = maxRadius * easeProgress
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Animation complete, hide overlay
      setTimeout(() => {
        isTransitioning.value = false
      }, 100)
    }
  }
  
  requestAnimationFrame(animate)
})
</script>

<style scoped>
.theme-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* On top of everything to apply filter */
  pointer-events: none;
  /* Use clip-path to create a circular mask from top-right corner */
  clip-path: circle(var(--circle-radius) at 100% 0%);
}

/* Apply filter to invert colors within the circle */
.theme-transition-overlay.to-dark {
  /* Invert + adjust hue to get better dark mode colors */
  backdrop-filter: invert(1) hue-rotate(180deg);
  -webkit-backdrop-filter: invert(1) hue-rotate(180deg);
}

.theme-transition-overlay:not(.to-dark) {
  /* Invert back to light mode */
  backdrop-filter: invert(1) hue-rotate(180deg);
  -webkit-backdrop-filter: invert(1) hue-rotate(180deg);
}
</style>
