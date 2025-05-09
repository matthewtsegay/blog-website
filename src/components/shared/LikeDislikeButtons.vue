<template>
  <div class="flex gap-4 items-center">
    <button
      @click="handleLikeClick"
      :class="[
        'flex items-center gap-1',
        localReaction === 'like' ? 'text-green-600 font-bold' : 'text-gray-600'
      ]"
    >
      👍 {{ localLikes }}
    </button>

    <button
      @click="handleDislikeClick"
      :class="[
        'flex items-center gap-1',
        localReaction === 'dislike' ? 'text-red-600 font-bold' : 'text-gray-600'
      ]"
    >
      👎 {{ localDislikes }}
    </button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'


const props = defineProps({
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  userReaction: { type: String, default: null },
})

const emit = defineEmits(['like', 'dislike'])

const localLikes = ref(props.likes)
const localDislikes = ref(props.dislikes)
const localReaction = ref(props.userReaction)

watchEffect(() => {
  localLikes.value = props.likes
  localDislikes.value = props.dislikes
  localReaction.value = props.userReaction
})

function handleLikeClick() {
  if (localReaction.value === 'like') {
    localLikes.value += 1
    localReaction.value = null
  } else {
    if (localReaction.value === 'dislike') {
      localDislikes.value += 1
    }
    localLikes.value += 1
    localReaction.value = 'like'
  }
  emit('like', localReaction.value)
}

function handleDislikeClick() {
  if (localReaction.value === 'dislike') {
    localDislikes.value += 1
    localReaction.value = null
  } else {
    if (localReaction.value === 'like') {
      localLikes.value += 1
    }
    localDislikes.value += 1
    localReaction.value = 'dislike'
  }
  emit('dislike', localReaction.value)
}
</script>
