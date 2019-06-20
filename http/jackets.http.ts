import ky from '@/http/base.http'
import { Items } from '@/types/response'

/**
 * /v1/jackets
 */
export const get = (): Promise<Items> => ky.get('jackets').json()
