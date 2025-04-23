<template>
  <navbar />
  <div class="min-h-screen bg-white">
   <section class="banner bg-[url('../assets/image/blog-372771_1280.jpg')] bg-cover bg-center bg-no-repeat round-md w-full h-screen flex items-center">
  <div class="container mx-auto px-6">
    <div class="max-w-xl">
      <h1 class="text-5xl font-extrabold text-gray-400 mb-4">Blog Content</h1>
      <h2 class="text-4xl font-bold text-gray-300 mb-4">Inspiration in Every Sip</h2>
      <p class="text-gray-200 text-3xl font-extrabold italic mb-6">
        “A good cup of coffee is more than just a drink—it’s a pause, a thought, a moment of clarity in the chaos of the day. Let your ideas brew, and your mind awaken.”
      </p>
    </div>
  </div>
</section>


<section class="py-16 bg-white">
  <div class="container bg-gray-100 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 class="text-3xl font-bold text-gray-800 mb-4">About Our Blog</h2>
      <p class="text-gray-400 mb-6 text-2xl font-bold">
        Our blog is a space where thoughts turn into stories, and stories spark inspiration. 
        We believe that every voice has a message worth sharing.  
        <br /><br />
        <em>"Words are free. It’s how you use them that may cost you." – Kipling Williams</em>
      </p>
      <router-link
        to="/"
        class="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
      >
        Read More
      </router-link>
    </div>
    <div class="py-4">
      <img src="../assets/image/blog-793047_1280.jpg" alt="About" class="rounded-lg shadow-md" />
    </div>
  </div>
</section>

    <section>
      <div 
    class="min-h-screen bg-cover bg-center px-4 py-10 bg-gray-50"
    style="background-image: url('/images/blog-bg.jpg')"
  >
    <!-- Header -->
    <h1 class="text-4xl font-bold text-center text-black drop-shadow-lg mb-10">
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
    </section>
    <!-- Gallery Section -->
   <!--<section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">Our Gallery</h2>
          <p class="text-gray-600 mt-2 max-w-2xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="relative group">
            <img
              :src="`/images/img-${i}.png`"
              :alt="`Gallery ${i}`"
              class="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <a href="#" class="text-white text-2xl">
                <i class="fa fa-search"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link
            to="/postDashBoard"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            See More
          </router-link>
        </div>
      </div>
    </section>-->
  </div>
  <footer1 />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllPosts, deletePost } from '../api/postsApi.JS';
import footer1 from '../components/shared/footer1.vue'
import navbar from '../components/shared/navbar.vue'

const message = ref('welcome to the blog!')
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
<style scoped>
.banner{
  background-image: url('../assets//image/blog-793047_1280.jpg');
}
</style>
