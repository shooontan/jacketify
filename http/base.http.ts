import axios from 'axios'

export const baseURL = 'https://api.jacketify.mahoroi.com/v1/'
export const timeout = 3000

const http = axios.create({ baseURL, timeout })

export default http
