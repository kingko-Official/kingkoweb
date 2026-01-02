<template>
  <div 
    class="card-wrapper"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <div 
      class="card" 
      :class="{ 'active': isActive, 'interacting': isInteracting }"
      :data-rarity="currentEffect"
      :data-supertype="supertype"
      :data-subtypes="subtypes"
      :data-gallery="isGallery"
      :style="cardStyle"
    >
      <div class="card__translater">
        <div class="card__rotator" tabindex="0">
          <div class="card__front">
            <img 
              v-if="imageUrl" 
              :src="imageUrl" 
              alt="Card Image"
              class="card__image"
            />
            <div v-else class="card__placeholder">
              <span>No Image</span>
            </div>
          </div>
          <div class="card__back">
            <div class="card__back-content">Card Back</div>
          </div>
          <div class="card__shine"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  },
  effectType: {
    type: String,
    default: 'rare holo'
  },
  supertype: {
    type: String,
    default: 'pokémon'
  },
  subtypes: {
    type: String,
    default: ''
  },
  isGallery: {
    type: Boolean,
    default: false
  }
})

const isActive = ref(false)
const isInteracting = ref(false)

// CSS 变量
const mx = ref(50)
const my = ref(50)
const tx = ref(0)
const ty = ref(0)
const rx = ref(0)
const ry = ref(0)
const posx = ref(50)
const posy = ref(50)
const hyp = ref(0)

const currentEffect = computed(() => props.effectType)

const cardStyle = computed(() => ({
  '--mx': `${mx.value}%`,
  '--my': `${my.value}%`,
  '--tx': `${tx.value}px`,
  '--ty': `${ty.value}px`,
  '--rx': `${rx.value}deg`,
  '--ry': `${ry.value}deg`,
  '--posx': `${posx.value}%`,
  '--posy': `${posy.value}%`,
  '--hyp': hyp.value
}))

const handleMouseMove = (e) => {
  if (!isActive.value) return
  
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // 计算鼠标位置百分比
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top
  mx.value = (mouseX / rect.width) * 100
  my.value = (mouseY / rect.height) * 100
  
  // 计算旋转角度
  const rotateX = ((mouseY / rect.height) - 0.5) * -30
  const rotateY = ((mouseX / rect.width) - 0.5) * 30
  rx.value = rotateY
  ry.value = rotateX
  
  // 计算背景位置
  posx.value = mx.value
  posy.value = my.value
  
  // 计算距离中心的距离 (用于亮度)
  const deltaX = e.clientX - centerX
  const deltaY = e.clientY - centerY
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2
  hyp.value = 1 - (distance / maxDistance)
}

const handleMouseEnter = () => {
  isActive.value = true
  isInteracting.value = true
}

const handleMouseLeave = () => {
  isActive.value = false
  isInteracting.value = false
  
  // 重置所有变换
  mx.value = 50
  my.value = 50
  tx.value = 0
  ty.value = 0
  rx.value = 0
  ry.value = 0
  posx.value = 50
  posy.value = 50
  hyp.value = 0
}
</script>

<style scoped>
.card-wrapper {
  perspective: 1000px;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 63 / 88;
}

.card {
  --radius: 4.55% / 3.5%;
  --s: 1;
  --o: 1;
  
  width: 100%;
  height: 100%;
  position: relative;
  transform: translate3d(0, 0, 0.1px);
  will-change: transform, visibility;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

.card.interacting {
  z-index: 120;
}

.card__translater,
.card__rotator {
  display: grid;
  perspective: 600px;
  transform-origin: center;
  will-change: transform;
  width: 100%;
  height: 100%;
}

.card__translater {
  position: relative;
  transform: translate3d(var(--tx), var(--ty), 0) scale(var(--s));
  transition: transform 0.3s ease-out;
}

.card__rotator {
  --glow: #69d1e9;
  transform: rotateY(var(--rx)) rotateX(var(--ry));
  transform-style: preserve-3d;
  box-shadow: 0px 10px 20px -5px black;
  border-radius: var(--radius);
  outline: none;
  transition: box-shadow 0.4s ease, outline 0.2s ease, transform 0.1s ease-out;
}

.card.active .card__rotator {
  box-shadow: 0 0 10px 0px var(--glow), 0 0 10px 0px var(--glow),
    0 0 30px 0px var(--glow);
}

.card__rotator > * {
  width: 100%;
  height: 100%;
  display: grid;
  grid-area: 1/1;
  border-radius: var(--radius);
  transform-style: preserve-3d;
}

.card__front,
.card__back {
  backface-visibility: hidden;
  overflow: hidden;
}

.card__back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__back-content {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
}

.card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
}

.card__placeholder span {
  color: #888;
  font-size: 1.5rem;
  font-weight: 600;
}

.card__shine {
  position: absolute;
  width: 100%;
  height: 100%;
  grid-area: 1/1;
  border-radius: var(--radius);
  opacity: var(--o);
  mix-blend-mode: color-dodge;
  pointer-events: none;
}
</style>