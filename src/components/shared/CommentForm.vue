<template>
    <form @submit.prevent="onSubmit" class="space-y-2">
      <FormTextarea v-model="comment" label="Write a comment..." />
      <FormButton text="Post Comment" />
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import FormTextarea from './FormTextarea.vue'
  import FormButton from './FormButton.vue'
  
  const emit = defineEmits(['submit'])
  
  const comment = ref('')
  
  function onSubmit() {
    if (!comment.value.trim()) return
    emit('submit', comment.value)
    comment.value = ''
  }
  </script>
  