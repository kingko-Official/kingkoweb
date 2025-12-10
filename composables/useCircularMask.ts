import { ref } from 'vue'

// Shared circular mask state
const circleRadius = ref(0)
const isTransitioning = ref(false)

export const useCircularMask = () => {
    const getMaxRadius = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        return Math.sqrt(width * width + height * height)
    }

    const startTransition = () => {
        isTransitioning.value = true
        circleRadius.value = 0

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
                // Animation complete
                setTimeout(() => {
                    isTransitioning.value = false
                }, 100)
            }
        }

        requestAnimationFrame(animate)
    }

    return {
        circleRadius,
        isTransitioning,
        startTransition
    }
}
