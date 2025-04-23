<template>
  <navbar />
  <div class="p-4 sm:p-6">
    <div class="bg-gray-100 px-4 py-2 sm:px-6 rounded-xl mb-6 shadow">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">Blog Posts</h1>
    <div class="relative flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-1/2">
       <label for="search" class="block text-md font-semibold text-gray-700">
         Search
      </label>
      <div class="relative w-full">
       <span
           class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-opacity duration-200"
           :class="{ 'opacity-0': searchTerm }"
       >
          🔍
     </span>
     <input
          id="search"
          v-model="searchTerm"
          type="text"
          placeholder="Enter keyword..."
         class="w-full pl-10 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
     />
    </div>
    </div>
        <button
          @click="createPost"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow w-full md:w-auto"
        >
          Create Blog +
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-xl shadow text-sm">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="text-left py-3 px-4">#</th>
            <th class="text-left py-3 px-4">Title</th>
            <th class="text-left py-3 px-4">Content</th>
            <th class="text-left py-3 px-4">Date</th>
            <th class="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(post, index) in filteredPosts"
            :key="post.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4 font-medium">{{ post.title }}</td>
            <td class="py-3 px-4 text-gray-600 truncate max-w-xs">{{ post.content }}</td>
            <td class="py-3 px-4 text-gray-500">{{ formatDate(post.created_at) }}</td>
            <td class="py-3 px-4 space-x-2">
              <button
                @click="editPost(post.id)"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                @click="deletePostById(post.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import navbar from '../../components/shared/navbar.vue'
import { getAllPosts, deletePost ,updatePost} from '../../api/postsApi.js'

const posts = ref([])
const searchTerm = ref('')
const router = useRouter()

const fetchPosts = async () => {
  posts.value = await getAllPosts()
}

const deletePostById = async (id) => {
  await deletePost(id)
  fetchPosts()
}

const createPost = () => {
  router.push({ name: 'createPost' })
}

const editPost = (id) => {
  router.push({ name: 'editPost', params: { id } })
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const filteredPosts = computed(() => {
  if (!searchTerm.value) return posts.value
  return posts.value.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
/* Optional: Add custom responsive tweaks if needed */
</style>
