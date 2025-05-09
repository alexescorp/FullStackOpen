import axios from 'axios'
const api_key = import.meta.env.VITE_CLIMA_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = async (capital, codigo) => {
    const request = axios.get(`${baseUrl}?q=${capital},${codigo}&APPID=${api_key}`)
    const response = await request
    return response.data
}

export default {
    getClimaAll: getAll
}