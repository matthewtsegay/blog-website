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
  