import { AxiosPromise } from 'axios'
import axios from '@/http/base.http'
import { Items } from '@/types/response'

/**
 * /v1/jackets
 */
export const get = (): AxiosPromise<Items> => axios.get('/jackets')

export default axios
