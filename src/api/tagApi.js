import api from '../services/apiServices.js'

export const getTags = async ( )=> {
    const response= await api.get('/tags')
    return response.data
}
export const addTags = async (data) => {
    const response = await api.post('/tags',data)
    return response.data
}