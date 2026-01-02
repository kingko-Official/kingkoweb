<template>
  <div class="effect-selector" :class="{ 'dark': isDark }">
    <h3 class="selector-title">Holographic Effects</h3>
    
    <div class="effect-list">
      <button
        v-for="effect in effects"
        :key="effect.value"
        class="effect-button"
        :class="{ 'active': modelValue === effect.value }"
        @click="selectEffect(effect.value)"
      >
        <span class="effect-icon">✨</span>
        <span class="effect-name">{{ effect.label }}</span>
      </button>
    </div>

    <div class="additional-options">
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          :checked="isGallery"
          @change="$emit('update:isGallery', $event.target.checked)"
        />
        <span>Gallery Edition</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  },
  isGallery: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:isGallery'])

const effects = [
  { value: 'rare holo', label: 'Rare Holo' },
  { value: 'rare holo galaxy', label: 'Galaxy Holo' },
  { value: 'rare holo v', label: 'Holo V' },
  { value: 'rare holo vmax', label: 'Holo VMAX' },
  { value: 'rare holo vstar', label: 'Holo VSTAR' },
  { value: 'rare ultra', label: 'Ultra Rare' },
  { value: 'rare rainbow', label: 'Rainbow Secret' },
  { value: 'rare rainbow alt', label: 'Rainbow Alt' },
  { value: 'rare secret', label: 'Gold Secret' },
  { value: 'rare radiant', label: 'Radiant' }
]

const selectEffect = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.effect-selector {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 300px;
  width: 100%;
}

.effect-selector.dark {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.05);
}

.selector-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.effect-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.effect-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.effect-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(105, 209, 233, 0.5);
  transform: translateX(4px);
}

.effect-button.active {
  background: rgba(105, 209, 233, 0.2);
  border-color: #69d1e9;
  color: #69d1e9;
  font-weight: 600;
}

.effect-icon {
  font-size: 1.2rem;
}

.effect-name {
  flex: 1;
}

.additional-options {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #69d1e9;
}

.checkbox-label:hover {
  color: #fff;
}
</style>