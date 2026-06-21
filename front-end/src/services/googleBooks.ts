import axios from 'axios'

const getApiKey = () => {
  return import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || ''
}

export const googleBooksApi = {
  getVolume: async (volumeId: string) => {
    const key = getApiKey()
    const url = `https://www.googleapis.com/books/v1/volumes/${volumeId}${key ? `?key=${key}` : ''}`
    return axios.get(url)
  },
  searchVolumes: async (query: string, maxResults?: number) => {
    const key = getApiKey()
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    if (maxResults !== undefined) {
      url += `&maxResults=${maxResults}`
    }
    if (key) {
      url += `&key=${key}`
    }
    return axios.get(url)
  }
}
