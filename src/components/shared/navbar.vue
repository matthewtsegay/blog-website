<template>
  <nav :class="[!authStore.isAuthenticated ? 'bg-black' : 'bg-transparent', 'shadow-md px-6 py-6 flex items-center justify-between relative w-full z-50']">
    <div class="flex items-center">
      <router-link to="/" class="text-2xl font-bold text-gray-100">
        {{ badge }}
      </router-link>
    </div>

    <!-- Blog Dropdown (centered) -->
    <div v-if="authStore.isAuthenticated" class="absolute left-1/2 transform -translate-x-1/2">
      <div class="relative" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          class="text-xl font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          Blog ▼
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white border border-blue-200 shadow-md rounded-md py-2 z-[999]"
        >
          <router-link
            to="/createPost"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            Create Blog
          </router-link>
          <div class="border-t border-blue-100"></div>
          <router-link
            to="/postDashBoard"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            Post Dashboard
          </router-link>
          <div class="border-t border-blue-100"></div>
          <router-link
            to="/MyPosts"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            My Blogs
          </router-link>
        </div>
      </div>
    </div>

    <!-- Right-side section -->
    <div class="flex items-center space-x-4">
      <template v-if="!authStore.isAuthenticated">
        <!-- User Dropdown -->
        <div class="relative" ref="userDropdownRef">
          <button
            @click="toggleUserDropdown"
            class="font-bold text-blue-600 hover:text-blue-800"
          >
            User ▼
          </button>
          <div
            v-if="userDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border border-blue-200 shadow-md rounded-md py-2 z-[999]"
          >
            <router-link
              to="/loginView"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
              @click="closeUserDropdown"
            >
              Login
            </router-link>
            <div class="border-t border-blue-100"></div>
            <router-link
              to="/signupView"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
              @click="closeUserDropdown"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- Profile Dropdown -->
        <div class="relative text-center" ref="profileDropdownRef">
          <img
            @click="toggleProfileDropdown"
            src="../../assets/image/image2.jpg"
            alt="Profile"
            class="w-10 h-10 rounded-full border-2 border-blue-400 shadow-sm object-cover cursor-pointer"
          />
          <p class="text-sm font-bold text-gray-700 mt-1">
            {{ authStore.user.name }}
          </p>
          <div
            v-if="profileDropdown"
            class="absolute right-0 mt-2 w-44 bg-white border border-blue-200 shadow-md rounded-md py-2 z-[999]"
          >
            <router-link
              to="/profileView"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
              @click="closeProfileDropdown"
            >
              Profile
            </router-link>
            <div class="border-t border-blue-100"></div>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-blue-100"
            >
              Logout
            </button>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const badge = ref('Blog website')

const dropdownOpen = ref(false)
const profileDropdown = ref(false)
const userDropdown = ref(false)

const dropdownRef = ref(null)
const profileDropdownRef = ref(null)
const userDropdownRef = ref(null)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
function closeDropdown() {
  dropdownOpen.value = false
}
function toggleProfileDropdown() {
  profileDropdown.value = !profileDropdown.value
}
function closeProfileDropdown() {
  profileDropdown.value = false
}
function toggleUserDropdown() {
  userDropdown.value = !userDropdown.value
}
function closeUserDropdown() {
  userDropdown.value = false
}
function logout() {
  authStore.logout()
  closeProfileDropdown()
  closeDropdown()
  router.push('/loginView')
}
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
    profileDropdown.value = false
  }
  if (userDropdownRef.value && !userDropdownRef.value.contains(event.target)) {
    userDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
