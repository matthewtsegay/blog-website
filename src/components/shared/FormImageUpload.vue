<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: File,
  label: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const previewUrl = ref('')
const imageName = ref('') // To store the image name
const imageUrl = ref('') // To store the uploaded image URL from the backend
const isDragging = ref(false)

// Watch for changes to modelValue and update preview and name
watch(() => props.modelValue, (newFile) => {
  if (newFile) {
    previewUrl.value = URL.createObjectURL(newFile)
    imageName.value = newFile.name // Set the image name when a new file is selected
  }
})

// Handle file selection
const handleFile = (file) => {
  if (file && file.type.startsWith('image/')) {
    emit('update:modelValue', file)
    
    // Upload the image to the backend
    const formData = new FormData()
    formData.append('image', file)

    // Replace 'YOUR_API_URL_HERE' with your actual API URL
    fetch('http://192.168.100.222:8700/api/blog/posts/create', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          imageUrl.value = data.url // Save the returned image URL from the backend
          console.log('Image URL:', imageUrl.value)
          // Optionally store the image URL in a global state or database
          saveImageUrlToBackend(imageUrl.value)
        } else {
          console.error('Image upload failed:', data.message)
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error)
      })
  }
}

// Function to save the image URL after upload (could be to a local state or backend)
const saveImageUrlToBackend = (url) => {
  // Here you could store it in your backend or global state
  // For example, using localStorage or saving to a database
  localStorage.setItem('imageUrl', url)
  console.log('Image URL saved to localStorage:', url)
}

// Handle input change
const handleFileChange = (event) => {
  const file = event.target.files[0]
  handleFile(file)
}

// Drag-and-drop events
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
  <div class="w-full flex justify-center items-center mb-6">
    <div class="w-full sm:w-80 flex flex-col items-center">
      <!-- Label -->
      <label :for="id" class="block text-sm font-bold text-gray-700 mb-2">
        {{ label }}
      </label>

      <!-- Show image if it's uploaded, otherwise show upload form -->
      <div v-if="!previewUrl" 
           class="border-2 border-dashed rounded-lg w-full h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
           :class="{
             'border-blue-400 bg-blue-100': isDragging,
             'border-gray-300 bg-white': !isDragging
           }"
           @dragover="onDragOver"
           @dragleave="onDragLeave"
           @drop="onDrop">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16V4m0 0l-4 4m4-4l4 4m6 4h2a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 16a4 4 0 004-4h1a2 2 0 012 2v1a4 4 0 01-4 4H7z"/>
        </svg>
        <p class="text-gray-500 text-sm mb-2">Drag & Drop image here</p>
        <input type="file" :id="id" accept="image/*" @change="handleFileChange" class="hidden" />
        <label :for="id" class="text-blue-600 hover:underline text-sm cursor-pointer">or browse files</label>
      </div>

      <!-- Show selected image -->
      <div v-if="previewUrl" class="mt-4 w-full flex justify-center">
        <img :src="previewUrl" alt="Selected Image" class="h-32 w-32 object-cover rounded-full border-2 border-gray-300" />
      </div>

      <!-- Show image name -->
      <div v-if="imageName" class="mt-2 text-sm text-gray-600">
          {{ imageName }}
      </div>

      <!-- Show uploaded image URL if available -->
      <div v-if="imageUrl" class="mt-2 text-sm text-gray-600">
        Image URL: {{ imageUrl }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide the file input when the image is selected */
input[type="file"] {
  display: none;
}
</style>
