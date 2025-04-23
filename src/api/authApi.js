import api from "../services/apiServices"

export const signup = async (data) => {
    const response = await api.post('/signup', data)
    return response.data
  }
export const login = async (data) => {
    const response = await api.post('/login', data)
    return response.data
  }
export const deleteUser = async (id) => {
    const response = await api.delete(`/delete/${id}`)
    return response.data
  }
export const ForgetPassword = async (id,data) => {
   const response = await api.put(`/forgetpassword/${id}`,data)
   return response.data
}
export const resetPassword = async (id,data) => {
  const response = await api.put(`/resetpassword/${id}`,data)
  return response.data
}
export const updateprofile = async (id,userdata) => {
  const response = await api.put(`/updateprofile/${id}`,userdata)
  return response.data
}
export const upload_image = async (id,image) => {
  const response = await api.post(`/upload-profile-picture/${id}`,image)
  return response.data
}