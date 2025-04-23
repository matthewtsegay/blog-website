import api from '../services/apiServices'

export const getComments = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`)
  return response.data
}

export const addComment = async (postId, data) => {
  const response = await api.post(`/posts/${postId}/comments`,data)
  return response.data
}
