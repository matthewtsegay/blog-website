<template>
  <div class="bg-gray-100 rounded p-3 mb-2">
    <p class="text-sm text-gray-600">
      {{ formatDate(comment.created_at) }} by <strong>{{ comment.user }}</strong>
    </p>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Props
const props = defineProps({
  comment: {
    type: Object,
    required: true,
    validator(value) {
      // You can validate the structure of the comment prop if needed
      return (
        value &&
        typeof value.created_at === 'string' &&
        typeof value.user === 'string' &&
        typeof value.content === 'string'
      )
    }
  }
})

// Function to format the date
function formatDate(date) {
  return new Date(date).toLocaleString() // Format date to the local string
}
</script>

<style scoped>
/* Optional: Additional styles for the comment container */
</style>
