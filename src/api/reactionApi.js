import api from '../services/apiServices.js'
//reaction controller
export const addReaction = async () => {
    const response = await api.post(`/reactions/toggle`)
    return response.data
  }
export const getReaction = async (postId) => {
    const response = await api.get(`/posts/${postId}`)
}