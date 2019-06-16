import sleep from './sleep'

describe('sleep util', () => {
  test('should return undefined (default)', async () => {
    const res = await sleep()
    expect(res).toBeUndefined()
  })

  test('should return string', async () => {
    const expected = 'sleep'
    const res = await sleep(0, expected)
    expect(res).toBe(expected)
  })
})
