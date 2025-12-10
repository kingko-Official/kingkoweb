<template>
  <canvas ref="canvas" class="background-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isDark?: boolean
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let width = 0
let height = 0

// Configuration
const DOT_SPACING = 40 // Spacing between dots
const DOT_RADIUS = 2 // Base radius of dots
const MAX_RADIUS = 6 // Max radius when magnified
const EFFECT_RADIUS = 300 // Radius of influence for the mouse

interface Dot {
  x: number
  y: number
  baseX: number
  baseY: number
}

let dots: Dot[] = []
const mouse = { x: -1000, y: -1000 } // Start off-screen

const initDots = () => {
  dots = []
  for (let x = 0; x < width; x += DOT_SPACING) {
    for (let y = 0; y < height; y += DOT_SPACING) {
      dots.push({
        x,
        y,
        baseX: x,
        baseY: y
      })
    }
  }
}

const resize = () => {
  if (!canvas.value) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width
  canvas.value.height = height
  initDots()
}

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const draw = () => {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, width, height)

  // Background color: Switch based on dark mode
  ctx.fillStyle = props.isDark ? '#1a1a1a' : '#e8e8e8'
  ctx.fillRect(0, 0, width, height)

  dots.forEach(dot => {
    const dx = mouse.x - dot.baseX
    const dy = mouse.y - dot.baseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    let radius = DOT_RADIUS
    let alpha = 0 // Base visibility - hidden when not near mouse

    if (dist < EFFECT_RADIUS) {
      // Calculate effect intensity (0 to 1)
      const intensity = 1 - dist / EFFECT_RADIUS
      
      radius = DOT_RADIUS + (MAX_RADIUS - DOT_RADIUS) * intensity
      
      // Opacity: "Further away, lighter". So closer = darker/more visible.
      alpha = 0.9 * intensity // Only visible when near mouse
    }

    // Only draw if alpha > 0 (optimization)
    if (alpha > 0) {
      ctx!.beginPath()
      ctx!.arc(dot.baseX, dot.baseY, radius, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(0, 200, 200, ${alpha})` // Cyan-ish
      ctx!.fill()
    }
  })

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    draw()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Behind everything */
  pointer-events: none; /* Let clicks pass through */
}
</style>
