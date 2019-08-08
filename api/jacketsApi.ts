import ky from '@/utils/http'
import { Items } from '@/types/response'

/**
 * /v1/jackets
 */
export const get = () => ky.get('jackets').json<Items>()
