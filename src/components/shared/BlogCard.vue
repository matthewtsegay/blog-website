<template>
    <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out m-4">
      <img v-if="post.image" :src="post.image" class="w-full h-52 object-cover rounded-t-2xl" />
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.content.slice(0, 100) }}...</p>
        <div class="flex justify-between items-center">
          <router-link :to="`/edit/${post.id}`" class="text-blue-600 hover:underline text-sm">Edit</router-link>
          <button @click="$emit('remove', post.id)" class="text-red-500 hover:text-red-600 text-sm">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['post']);
  defineEmits(['remove']);
  </script>
  