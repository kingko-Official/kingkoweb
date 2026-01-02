<template>
  <div class="page page-2" :class="{ 'dark': isDark }">
    <div class="holo-container">
      <!-- 左侧：卡片显示区 -->
      <div class="card-display">
        <HoloCard 
          :image-url="cardImage"
          :effect-type="selectedEffect"
          :is-gallery="isGallery"
        />
      </div>

      <!-- 右侧：效果选择器 -->
      <div class="selector-panel">
        <EffectSelector 
          v-model="selectedEffect"
          v-model:is-gallery="isGallery"
          :is-dark="isDark"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HoloCard from '@/components/HoloCard.vue'
import EffectSelector from '@/components/EffectSelector.vue'

defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})

// 卡片图片链接
const cardImage = ref('https://img.kingko.org/GvF8DqhWoAAFPuk.jpg')

// 当前选择的效果
const selectedEffect = ref('rare holo')

// 是否为 Gallery 版本
const isGallery = ref(false)
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  scroll-snap-align: start;
}

.page-2 {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.page-2.dark {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.holo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
}

.card-display {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
}

.selector-panel {
  flex: 0 0 auto;
}

@media (max-width: 968px) {
  .holo-container {
    flex-direction: column;
    gap: 2rem;
  }
  
  .card-display {
    width: 100%;
    max-width: 400px;
  }
}
</style>