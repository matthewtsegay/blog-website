import api from "../services/apiServices"

export const signup = async (data) => {
    const response = await api.post('/signup', data)
    return response.data
  }
export const login = async (data) => {
    const response = await api.post('/login', data)
    return response.data
  }
export const deleteuser = async (id) => {
    const response = await api.delete(`/delete-User/${id}`)
    return response.data
  }
export const ForgotPassword = async (data) => {
   const response = await api.put('/forgot-password',data)
   return response.data
}
export const resetPassword = async (id,data) => {
  const response = await api.put(`/reset-password/${id}`,data)
  return response.data
}
export const updateprofile = async (id,userdata) => {
  const response = await api.put(`/update-profile/${id}`,userdata)
  return response.data
}
export const upload_image = async (id,image) => {
  const response = await api.post(`/upload-profile-picture/${id}`,image)
  return response.data
}