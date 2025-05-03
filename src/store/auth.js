
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const registrationComplete = computed(() => user.value?.registrationComplete || false)

  const set = (data) =>{
    user.value = data.user
    token.value = data.token
  }

  const updateProfile = async (profileData) => {
    if (!token.value) throw new Error('Not authenticated')

    try {
      const response = await axios.put(
        'http://localhost:8080/api/user/profile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )

      user.value = response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed')
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    delete axios.defaults.headers.common['Authorization']
  }
  return {
    user,
    token,
    set,
    isAuthenticated,
    registrationComplete,
    updateProfile,
    logout,
  }
})

export default useAuthStore;