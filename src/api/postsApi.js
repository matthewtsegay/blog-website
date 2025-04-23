import api from  '../services/apiServices.js'

export const getAllPosts = async () => {
    const response = await api.get('/posts')
    return response.data
}
export const getPostById = async (id) => {
    const response = await api.get(`/posts/${id}`)
    return response.data
}
export const createPost = async (post) => {
    const response = await api.post('/posts/create',post)
    return response.data
}
export const updatePost = async (id,post) => {
    const response = await api.put(`/posts/${id}`,post)
    return response.data
}
export const deletePost = async (id) =>{
    const response = await api.delete(`/posts/${id}`)
    return response.data
}
