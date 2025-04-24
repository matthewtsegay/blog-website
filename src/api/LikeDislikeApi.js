import api from '../services/apiServices.js'
export const likePost = async (postId) => {
    const response = await api.post(`/blog/posts/${postId}/like`)
    return response.data
  }
  
export const dislikePost = async (postId) => {
    const response = await api.post(`/blog/posts/${postId}/dislike`)
    return response.data
  }