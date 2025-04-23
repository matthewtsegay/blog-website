<template>
  <navbar />

  <!-- Background Section -->
  <div
    class="min-h-screen bg-cover bg-center px-4 py-10"
    style="background-image: url('/images/blog-bg.jpg')"
  >
    <!-- Header -->
    <h1 class="text-4xl font-bold text-center text-black mb-10">
      My Blog Posts
    </h1>

    <!-- Posts Container -->
    <div class="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-7xl mx-auto p-8">
      <div class="relative">
        <!-- Left Arrow -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md"
        >
          &#10094;
        </button>

        <!-- Slides -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="post in userPosts"
              :key="post.id"
              class="min-w-full sm:min-w-[50%] lg:min-w-[33.3333%] px-4"
            >
              <div
                class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out m-4"
              >
                <img
                  v-if="post.image"
                  :src="post.image"
                  alt="Post Image"
                  class="w-full h-52 object-cover rounded-t-2xl"
                />
                <div class="p-6">
                  <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
                  <p class="text-gray-600 mb-4">
                    {{ post.content.substring(0, 100) }}...
                  </p>
                  <div class="flex justify-between items-center">
                    <router-link
                      :to="`/edit/${post.id}`"
                      class="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="removePost(post.id)"
                      class="text-red-500 hover:text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow -->
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md"
        >
          &#10095;
        </button>
      </div>
    </div>
  </div>

  <footer1 />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getAllPosts, deletePost } from '../../api/postsApi.JS';
import navbar from '../../components/shared/navbar.vue';
import footer1 from '../../components/shared/footer1.vue';

const userPosts = ref([]);
const currentSlide = ref(0);

onMounted(async () => {
  const allPosts = await getAllPosts();
  const userId = localStorage.getItem('userId');
  userPosts.value = allPosts.filter(post => post.userId === userId);
});

async function removePost(id) {
  await deletePost(id);
  userPosts.value = userPosts.value.filter(post => post.id !== id);
}

function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--;
}

function nextSlide() {
  const maxSlides = Math.ceil(userPosts.value.length / 3) - 1;
  if (currentSlide.value < maxSlides) currentSlide.value++;
}
</script>
