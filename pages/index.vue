<template>
  <div class="fullpage-container" ref="container">
    <!-- Dark Mode Toggle Button -->
    <button 
      ref="themeToggleBtn"
      @click="toggleDarkMode" 
      class="theme-toggle" 
      :class="{ 'dark': isDark, 'expanded': isButtonExpanded }"
    >
      <svg v-if="!isDark" class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <svg v-else class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>

    <!-- 第一页组件 -->
    <Page1 :is-dark="isDark" />

    <!-- 第二页组件 -->
    <Page2 :is-dark="isDark" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { isDark, toggleDarkMode } = useDarkMode()

const container = ref(null)
const themeToggleBtn = ref(null)
const isButtonExpanded = ref(false)
let hideTimeout = null
let isAnimating = false

// 页面滚动状态
const currentPage = ref(0) // 0 = 第一页, 1 = 第二页
const isScrolling = ref(false)

// 处理滚轮事件
const handleWheel = (e) => {
  if (isScrolling.value) return
  
  e.preventDefault()
  
  // 向下滚动
  if (e.deltaY > 0 && currentPage.value === 0) {
    scrollToPage(1)
  }
  // 向上滚动
  else if (e.deltaY < 0 && currentPage.value === 1) {
    scrollToPage(0)
  }
}

// 滚动到指定页面
const scrollToPage = (pageIndex) => {
  if (isScrolling.value) return
  
  isScrolling.value = true
  currentPage.value = pageIndex
  
  if (container.value) {
    const scrollPosition = pageIndex * window.innerHeight
    container.value.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
    
    // 滚动完成后重置标志
    setTimeout(() => {
      isScrolling.value = false
    }, 800) // 与 CSS transition 时间匹配
  }
}

// Handle mouse movement
const handleMouseMove = (e) => {
  if (!themeToggleBtn.value) return
  
  const btn = themeToggleBtn.value
  const rect = btn.getBoundingClientRect()
  
  // Check if mouse is over the visible half of the button (when collapsed)
  // The button is 50px wide, positioned at right: -25px, so only 25px is visible
  const mouseX = e.clientX
  const mouseY = e.clientY
  
  // Check if mouse is in the button area (including the hidden part)
  const isOverButton = 
    mouseX >= rect.left && 
    mouseX <= rect.right && 
    mouseY >= rect.top && 
    mouseY <= rect.bottom
  
  if (!isButtonExpanded.value && isOverButton && !isAnimating) {
    // Mouse is over the exposed half, expand the button
    isButtonExpanded.value = true
    isAnimating = true
    
    // Clear any pending hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }
    
    // After animation completes, start checking if mouse is still on button
    setTimeout(() => {
      isAnimating = false
      // Check if mouse is still over button
      if (!isOverButton) {
        scheduleHide()
      }
    }, 400) // Match the CSS transition duration
  } else if (isButtonExpanded.value && !isAnimating && !isOverButton) {
    // Mouse left the button, schedule auto-hide
    scheduleHide()
  } else if (isButtonExpanded.value && !isAnimating && isOverButton) {
    // Mouse is back on button, cancel hide
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }
  }
}

const scheduleHide = () => {
  // Clear existing timeout
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
  
  // Schedule hide after 500ms
  hideTimeout = setTimeout(() => {
    isButtonExpanded.value = false
    hideTimeout = null
  }, 500)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('wheel', handleWheel)
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})

useHead({
  title: 'Kingko',
  meta: [
    { name: 'description', content: 'Kingko Homepage' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap' }
  ]
})
</script>

<style scoped>
/* 全屏容器 */
.fullpage-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: relative;
}

/* Theme Toggle Button */
.theme-toggle {
  position: fixed;
  top: 2rem;
  right: -25px; /* Half hidden by default */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fafafa;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.3s ease,
              box-shadow 0.3s ease;
  z-index: 1000;
}

/* Expanded state controlled by JavaScript */
.theme-toggle.expanded {
  right: 2rem; /* Slide out to full view */
}

.theme-toggle.expanded:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.theme-toggle.dark {
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toggle-icon {
  width: 24px;
  height: 24px;
  color: #333;
  transition: color 0.3s ease;
}

.theme-toggle.dark .toggle-icon {
  color: #ffd700;
}
</style>

