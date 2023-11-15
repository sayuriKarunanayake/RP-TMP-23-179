import axios from "axios"

const API_URL = "https://itconnect-backend-8c64d94c6e02.herokuapp.com/api" // Update with your backend URL

export const uploadFile = (formData) =>
  axios.post(`${API_URL}/upload`, formData)
export const getUploadedFiles = () => axios.get(`${API_URL}/uploads`)
export const deleteUploadedFile = (id) =>
  axios.delete(`${API_URL}/uploads/${id}`)
