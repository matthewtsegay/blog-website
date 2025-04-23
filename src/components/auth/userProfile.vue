<template>
   <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
     <div class="mb-1">
       <h1 class="text-2xl font-bold text-white py-3 bg-blue-600 rounded-t-md text-center">
         Welcome, {{ firstName }}
       </h1>
       <h2 class="text-xl font-semibold text-white bg-blue-500 py-2 px-4 text-left">
         User Profile
       </h2>
     </div>
 
     <div v-if="profilePicture" class="mb-6 flex justify-center">
       <img :src="profilePicture" alt="Profile Picture" class="w-32 h-32 rounded-full object-cover" />
     </div>
 
     <table class="w-full border border-blue-300 rounded-lg overflow-hidden">
       <tbody class="divide-y divide-blue-200">
         <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
           <td class="font-semibold bg-blue-200 p-2 w-1/4">Name :</td>
           <td class="p-4">
             <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
               {{ firstName }} {{ lastName }}
             </div>
             <div v-else class="flex space-x-2">
               <input v-model="firstName" placeholder="First Name"
                      class="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
               <input v-model="lastName" placeholder="Last Name"
                      class="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
             </div>
           </td>
         </tr>
 
         <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
           <td class="font-semibold bg-blue-200 p-2">Username :</td>
           <td class="p-4">
             <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
               {{ username }}
             </div>
             <input v-else v-model="username"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
           </td>
         </tr>
 
         <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
           <td class="font-semibold bg-blue-200 p-2">Email :</td>
           <td class="p-4">
             <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
               {{ email }}
             </div>
             <input v-else v-model="email"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
           </td>
         </tr>
 
         <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
           <td class="font-semibold bg-blue-200 p-2">Phone :</td>
           <td class="p-4">
             <div v-if="!isEditing" class="hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
               {{ phoneNumber }}
             </div>
             <input v-else v-model="phoneNumber"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
           </td>
         </tr>
 
         <tr class="bg-blue-50 hover:bg-blue-300 transition-colors">
           <td class="font-semibold bg-blue-200 p-2">Bio:</td>
           <td class="p-2">
             <div v-if="!isEditing" class="whitespace-pre-line hover:bg-blue-300 transition-colors px-2 py-1 rounded-md">
               {{ bio }}
             </div>
             <textarea v-else v-model="bio"
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
 import { ref } from 'vue'
 import { useAuthStore } from '../../store/auth.js'
 
 const authStore = useAuthStore()
 
 const firstName = ref(authStore.user?.firstName || '')
 const lastName = ref(authStore.user?.lastName || '')
 const username = ref(authStore.user?.username || '')
 const email = ref(authStore.user?.email || '')
 const phoneNumber = ref(authStore.user?.phoneNumber || '')
 const bio = ref(authStore.user?.bio || '')
 const profilePicture = ref(authStore.user?.profilePicture || '')
 
 const isEditing = ref(false)
 
 const submitProfile = () => {
   authStore.user.firstName = firstName.value
   authStore.user.lastName = lastName.value
   authStore.user.username = username.value
   authStore.user.email = email.value
   authStore.user.phoneNumber = phoneNumber.value
   authStore.user.bio = bio.value
   isEditing.value = false
 }
 </script>
 