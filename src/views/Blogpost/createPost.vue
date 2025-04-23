<template>
  <navbar />

  <div class="min-h-screen flex items-center justify-center bg-gray-200 py-8">
    <div class="w-full max-w-2xl bg-blue-100 border-shadow-md  p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6 text-center  bg-blue-500 text-white p-2">Create Post</h1>

      <form @submit.prevent="submitPost" class="space-y-4 bg-white p-4">
        <FormImageUpload
                   v-model="post.image"
                   id="image"
                   label="Upload Image"
        />
        <FormInput
          v-model="post.title"
          type="text"
          id="title"
          label="Title"
          placeholder="Enter post title"
          required
        />
        <FormInput
          v-model="post.category"
          type="text"
          id="category"
          label="Category"
          placeholder="Enter category"
          required
        />

        <FormInput
          v-model="post.tags"
          type="text"
          id="tags"
          label="Tags"
          placeholder="Add tags....."
        />
        <div class="mb-4 flex flex-col items-center sm:items-start sm:ml-20 sm:w-[28rem] w-full">
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1 w-full sm:w-auto text-center sm:text-left">
              Content
           </label>
           <textarea
                 v-model="post.content"
                 id="content"
                 placeholder="Enter content..."
                 required
                 class="w-full sm:w-[28rem] border rounded-lg p-2 h-32"
           ></textarea>
      </div>
     <div class="flex justify-center sm:justify-start sm:ml-20 mb-4 w-full sm:w-[28rem]">
                   <button
                       type="submit"
                       class="w-full sm:w-[28rem] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                   >
                   Create
                  </button>
        </div>
        </form>
      </div>
    </div>
  <footer1 />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '../../api/postsApi.js';
import navbar from '../../components/shared/navbar.vue';
import footer1 from '../../components/shared/footer1.vue';
import FormInput from '../../components/shared/FormInput.vue'; 
import FormImageUpload from '../../components/shared/FormImageUpload.vue';

const router = useRouter();
const post = ref({
  title: '',
  content: '',
  image:null,
  category: '',
  tags: ''
});

async function submitPost() {
  const formattedPost = {
    ...post.value,
    tags: post.value.tags.split(',').map(tag => tag.trim())
  };
  await createPost(formattedPost);
  router.push('/');
}
</script>
