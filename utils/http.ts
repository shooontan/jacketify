import ky from 'ky-universal'

export const prefixUrl = 'https://api.jacketify.mahoroi.com/v1/'
export const timeout = 10000

const http = ky.create({
  prefixUrl,
  timeout
})

export default http
