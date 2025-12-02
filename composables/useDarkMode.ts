import { ref } from 'vue'

const isDark = ref(false)

export const useDarkMode = () => {
    const toggleDarkMode = () => {
        isDark.value = !isDark.value
    }

    return {
        isDark,
        toggleDarkMode
    }
}
