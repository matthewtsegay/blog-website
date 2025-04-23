import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts',()=>{
    const posts = ref([])

    const addPost = (post) => posts.value.push(post)
    const updatepost = (updatedpost) => {
            const index = posts.value.findIndex(post => post.id === updatedpost.id)
            if(index!==-1) posts.value[index] = updatedpost
        } 

    const deletepost = (postId)=>{
        posts.value = posts.value.filter(post => post.id !== postId)
    }
    
        return {
            posts,
            addPost,
            updatepost,
            deletepost
        }
    })
