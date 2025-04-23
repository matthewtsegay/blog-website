<template>
    <div>
      <h1>Edit Post</h1>
      <form @submit.prevent="submitPost">
        <input v-model="post.title" placeholder="Title" required />
        <textarea v-model="post.content" placeholder="Content" required></textarea>
        <input v-model="post.image" placeholder="Image URL" />
        <input v-model="post.category" placeholder="Category" required />
        <input v-model="post.tags" placeholder="Tags (comma-separated)" />
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getPost, updatePost } from '../api/postService';
  
  const route = useRoute();
  const router = useRouter();
  const post = ref({ title: '', content: '', image: '', category: '', tags: [] });
  
  onMounted(async () => {
    const data = await getPost(route.params.id);
    post.value = { ...data, tags: data.tags.join(', ') };
  });
  
  async function submitPost() {
    const formattedPost = { ...post.value, tags: post.value.tags.split(',').map(tag => tag.trim()) };
    await updatePost(route.params.id, formattedPost);
    router.push('/user-posts');
  }
  </script>