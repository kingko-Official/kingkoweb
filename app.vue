<template>
  <div>
    <BackgroundEffect :isDark="isDark" />
    <NuxtPage />
  </div>
</template>

<script setup>
const { isDark } = useDarkMode()
</script>
