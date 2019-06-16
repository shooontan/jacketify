/**
 * wait util
 */
export default function sleep<_, T>(time: number = 0, value?: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(value)
    }, time)
  })
}
