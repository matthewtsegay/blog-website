<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: File,
  label: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])
const previewUrl = ref('')
const isDragging = ref(false)

// Watch for changes to modelValue and update preview
watch(() => props.modelValue, (newFile) => {
  if (newFile) {
    previewUrl.value = URL.createObjectURL(newFile)
  }
})

// Handle file selection via input or drop
const handleFile = (file) => {
  if (file && file.type.startsWith('image/')) {
    emit('update:modelValue', file)
  }
}

// Input change event
const handleFileChange = (event) => {
  const file = event.target.files[0]
  handleFile(file)
}

// Drag-and-drop handlers
const onDrop = (e) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer.files.length > 0) {
    handleFile(e.dataTransfer.files[0])
  }
}

const onDragOver = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}
</script>

<template>
  <div class="mb-4 w-full sm:w-[28rem] sm:ml-4 sm:mr-40 flex flex-col sm-flex-row justify-center">
    <label :for="id" class="block text-sm font-extrabold text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      class="border-2 rounded-full w-sm border-dashed mr-20 px-auto flex flex-col items-center justify-center text-gray-500 cursor-pointer transition"
      :class="{
        'border-blue-400 bg-blue-50': isDragging,
        'border-gray-300': !isDragging
      }"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16V4m0 0l-4 4m4-4l4 4m6 4h2a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 16a4 4 0 004-4h1a2 2 0 012 2v1a4 4 0 01-4 4H7z"/>
      </svg>
      <p>Drag & Drop your image here or</p>
      <input
        type="file"
        :id="id"
        accept="image/*"
        @change="handleFileChange"
        class="mt-2"
      />
    </div>

    <div v-if="previewUrl" class="mt-4 text-center">
     <img
        :src="previewUrl"
        alt="Preview"
        class="h-32 w-32 mx-auto rounded-full object-cover border-2 border-gray-300"
     />
   </div>

  </div>
</template>
