import api from '../services/apiServices'

export const getComments = async (Id) => {
  const response = await api.get(`/posts/${Id}/comments`)
  return response.data
}

export const addComment = async (Id, data) => {
  const response = await api.post(`/posts/${Id}/comments`,data)
  return response.data
}
