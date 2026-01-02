<template>
  <div class="page page-1">
    <!-- 背景效果只在第一页 -->
    <div class="background-wrapper">
      <BackgroundEffect :isDark="isDark" />
    </div>
    
    <div class="card-container">
      <div class="white-card" :class="{ 'dark': isDark }">
        <div class="image-wrapper">
          <img 
            src="https://img.kingko.org/20251202100019460.png" 
            alt="Profile Image"
            class="circular-image"
          />
        </div>
        <div class="username">@kingko</div>
        <div class="social-icons">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="icon-link">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.bilibili.com" target="_blank" rel="noopener noreferrer" class="icon-link">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="icon-link">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收主题状态作为 prop
defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})

// 添加 Google Font
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap' }
  ]
})
</script>

<style scoped>
/* 页面基础样式 - 第一页独立样式 */
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  scroll-snap-align: start;
}

/* 第一页 - 无固定背景，使用 BackgroundEffect */
.page-1 {
  background: transparent;
}

/* 背景包装器 - 限制背景效果只在第一页 */
.background-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.card-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.white-card {
  background-color: #fafafa;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;
}

.white-card.dark {
  background-color: #2a2a2a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.circular-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.white-card.dark .circular-image {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.username {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  font-weight: 600;
  color: #5fd3bc;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(95, 211, 188, 0.1);
  color: #5fd3bc;
  transition: all 0.3s ease;
  text-decoration: none;
}

.icon-link:hover {
  background-color: #5fd3bc;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(95, 211, 188, 0.3);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>

