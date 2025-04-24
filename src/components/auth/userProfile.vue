<template>
  <div class="max-w-xl mt-6 mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="mb-1">
      <h1 class="text-2xl font-bold text-white py-3 bg-blue-600 rounded-t-md text-center">
        Welcome, {{ profile.firstName }}
      </h1>
      <h2 class="text-xl font-semibold text-white bg-blue-500 py-2 px-4 text-left">
        User Profile
      </h2>
    </div>

    <div v-if="profile.profilePicture" class="mb-6 flex justify-center">
      <img :src="profile.profilePicture" alt="Profile Picture" class="w-32 h-32 rounded-full object-cover" />
    </div>

    <table class="w-full border border-blue-300 rounded-lg overflow-hidden">
      <tbody class="divide-y divide-blue-200">
        <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
          <td class="font-semibold bg-blue-200 p-2 w-1/4">Name :</td>
          <td class="p-4">
            <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
              {{ profile.firstName }} {{ profile.lastName }}
            </div>
            <div v-else class="flex space-x-2">
              <input v-model="profile.firstName" placeholder="First Name"
                     class="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input v-model="profile.lastName" placeholder="Last Name"
                     class="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </td>
        </tr>

        <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
          <td class="font-semibold bg-blue-200 p-2">Username :</td>
          <td class="p-4">
            <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
              {{ profile.username }}
            </div>
            <input v-else v-model="profile.username"
                   class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </td>
        </tr>

        <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
          <td class="font-semibold bg-blue-200 p-2">Email :</td>
          <td class="p-4">
            <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
              {{ profile.email }}
            </div>
            <input v-else v-model="profile.email"
                   class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </td>
        </tr>

        <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
          <td class="font-semibold bg-blue-200 p-2">Phone :</td>
          <td class="p-4">
            <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
              {{ profile.phoneNumber }}
            </div>
            <input v-else v-model="profile.phoneNumber"
                   class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </td>
        </tr>

        <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
          <td class="font-semibold bg-blue-200 p-2">Bio:</td>
          <td class="p-2">
            <div v-if="!isEditing" class="whitespace-pre-line hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
              {{ profile.bio }}
            </div>
            <textarea v-else v-model="profile.bio"
                      class="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
                      placeholder="Write something about yourself..."></textarea>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6 flex space-x-4">
      <button
        class="px-5 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-600 transition"
        @click="isEditing = !isEditing"
      >
        {{ isEditing ? 'Cancel' : 'Edit Profile' }}
      </button>

      <button
        v-if="isEditing"
        class="px-5 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
        @click="submitProfile"
      >
        Submit
      </button>
    </div>

    <router-link
      v-if="!authStore.registrationComplete"
      :to="{ name: 'signupView' }"
      class="mt-6 block text-blue-500 hover:underline"
    >
      Complete Registration
    </router-link>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from '../../store/auth.js'
import { getProfile, updateprofile } from '../../api/authApi.js'

const authStore = useAuthStore()
const isEditing = ref(false)

const profile = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  bio: '',
  profilePicture: ''
})

const fetchProfile = async () => {
  try {
    const result = await getProfile()
    Object.assign(profile, result)
  } catch (error) {
    console.error('Failed to fetch profile:', error)
  }
}

const submitProfile = async () => {
  try {
    const result = await updateprofile({ ...profile })
    Object.assign(profile, result)
    authStore.user = result 
    isEditing.value = false
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  }
}

onMounted(fetchProfile)
</script>
