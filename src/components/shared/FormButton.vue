<template>
  <button
    :type="type"
    :class="['w-full', 'py-2', 'rounded-lg', 'transition', buttonClasses]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  type: { type: String, default: 'button' }, // Default is "button", can be "submit"
  variant: { type: String, default: 'primary' }, // Can be "primary", "secondary", etc.
});

// Classes based on button variant
const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'secondary':
      return 'bg-gray-600 text-white hover:bg-gray-700';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
  }
});

function handleClick(event) {
  // You can handle any logic when the button is clicked
  // For example, emitting events or logging something
  console.log('Button clicked!');
}
</script>

<style scoped>
/* Optional: Additional button styles */
</style>
