<template>
    <div class="flex gap-4 items-center">
      <button
        @click="handleLike"
        :class="['flex items-center gap-1', userReaction === 'like' ? 'text-green-600 font-bold' : 'text-gray-600']">
        👍 {{ likes }}
      </button>
      <button
        @click="handleDislike"
        :class="['flex items-center gap-1', userReaction === 'dislike' ? 'text-red-600 font-bold' : 'text-gray-600']">
        👎 {{ dislikes }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    likes: Number,
    dislikes: Number,
    userReaction: String,
  })
  
  const emit = defineEmits(['like', 'dislike'])
  
  const userReaction = ref(props.userReaction)
  
  watch(() => props.userReaction, (val) => {
    userReaction.value = val
  })
  
  function handleLike() {
    if (userReaction.value === 'like') {
      emit('like', 'remove')
      userReaction.value = null
    } else {
      emit('like', 'add')
      userReaction.value = 'like'
    }
  }
  
  function handleDislike() {
    if (userReaction.value === 'dislike') {
      emit('dislike', 'remove')
      userReaction.value = null
    } else {
      emit('dislike', 'add')
      userReaction.value = 'dislike'
    }
  }
  </script>
  