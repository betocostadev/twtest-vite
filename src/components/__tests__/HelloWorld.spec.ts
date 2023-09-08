import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Message from Vitest' },
    })
    expect(HelloWorld).toBeTruthy()
    expect(wrapper.text()).toContain('Message from Vitest')
  })
  // test('Mount HelloWorld', () => {
  //   const wrapper = mount(HelloWorld, {
  //     props: { msg: 'Message from Vitest' },
  //   })
  // })
})
