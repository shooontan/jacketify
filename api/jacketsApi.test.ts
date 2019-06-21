import * as jacketsApi from './jacketsApi'

describe('jacketsApi', () => {
  test('get method', async () => {
    const response = await jacketsApi.get()
    expect(response).toHaveProperty('items')
  })
})
