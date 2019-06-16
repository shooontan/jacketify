import { shallowMount } from '@vue/test-utils'
import JacketImage from './JacketImage.vue'

describe('JacketImage', () => {
  const wrapper = shallowMount(JacketImage)

  test('render default Component', () => {
    expect(wrapper.classes()).toContain('jacket')
    expect(wrapper.is('img')).toBe(true)
    expect(wrapper.attributes('src')).toBe(
      'https://placehold.jp/666666/666666/200x200.png'
    )
  })

  test('onload event', () => {
    const src = 'http://example.com/image.jpg'
    wrapper.setData({ loaded: false })
    wrapper.setProps({ src })
    wrapper.trigger('load')
    // @ts-ignore
    expect(wrapper.vm.loaded).toBeTruthy()
    expect(wrapper.attributes('src')).toBe(src)
  })
})
