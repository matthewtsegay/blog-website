<script setup>
import userProfile from '../../components/auth/userProfile.vue'
import { useAuthStore } from '../../store/auth.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import footer1 from '../../components/shared/footer1.vue'
import navbar from '../../components/shared/navbar.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'ProfileView' })
  }
})
</script>

<template>
  <div class="flex justify-center items-start min-h-[80vh] p-5 bg-gray-50">
    <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
      <navbar />
      <userProfile />
      <footer1 />
    </div>
  </div>
</template>
