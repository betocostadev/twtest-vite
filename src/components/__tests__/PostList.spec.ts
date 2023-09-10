import { VueWrapper, mount } from '@vue/test-utils'
import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import PostList from '../PostList.vue'
import { usePostsStore } from '../../stores/posts/usePostsStore'

const app = createApp({})

describe('PostList', () => {
  let wrapper: VueWrapper | null = null

  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)

  beforeEach(() => {
    wrapper = mount(PostList, {
      props: { title: 'Sortable Post List' },
    })
  })

  it('renders properly', () => {
    expect(PostList).toBeTruthy()
    expect(wrapper?.text()).toContain('Sortable Post List')
  })

  it('starts with no posts', () => {
    expect(PostList).toBeTruthy()
    expect(wrapper?.text()).not.toContain('Post 1')
  })

  it('calls store setPosts', async () => {
    const store = usePostsStore()
    const spy = vi.spyOn(store, 'setPosts')
    await store.setPosts(5)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('loads first five posts', async () => {
    const store = usePostsStore()
    const spy = vi.spyOn(store, 'setPosts')
    await store.setPosts(5)
    expect(spy).toHaveBeenCalledTimes(1)

    expect(store.getPosts.length).toBe(5)
    const postFive = wrapper?.find('#post-4')
    expect(postFive).toBeTruthy()
    expect(postFive?.text()).toContain('Post ')
    expect(wrapper?.text()).toContain('Post 1')
    expect(wrapper?.text()).not.toContain('Post 6')
  })

  it('it moves a post from index n to index n+1', async () => {
    const store = usePostsStore()
    const spy = vi.spyOn(store, 'setPosts')
    await store.setPosts(5)
    expect(spy).toHaveBeenCalledTimes(1)

    expect(store.getPosts.length).toBe(5)
    const firstPost = wrapper?.find('#post-0')
    expect(firstPost?.text()).toContain('Post 1')
    await firstPost?.get('button').trigger('click')
    const changedFirstPost = wrapper?.find('#post-1')
    expect(changedFirstPost?.text()).toContain('Post 1')
  })

  it('it moves a post from index n to index n-1', async () => {
    const store = usePostsStore()
    const spy = vi.spyOn(store, 'setPosts')
    await store.setPosts(5)
    expect(spy).toHaveBeenCalledTimes(1)

    expect(store.getPosts.length).toBe(5)
    const secondPost = wrapper?.find('#post-1')
    expect(secondPost?.text()).toContain('Post 2')
    await secondPost?.findAll('button')[0].trigger('click')
    const changedPost = wrapper?.find('#post-0')
    expect(changedPost?.text()).toContain('Post 2')
  })

  it('it changes post 1 from index 0 to index 1', async () => {
    const store = usePostsStore()
    const spy = vi.spyOn(store, 'setPosts')
    await store.setPosts(5)
    expect(spy).toHaveBeenCalledTimes(1)

    expect(store.getPosts.length).toBe(5)
    const firstPost = wrapper?.find('#post-0')
    expect(firstPost?.text()).toContain('Post 1')
    const secondPost = wrapper?.find('#post-1')
    expect(secondPost?.text()).toContain('Post 2')
    await firstPost?.get('button').trigger('click')
    const changedFirstPost = wrapper?.find('#post-0')
    expect(changedFirstPost?.text()).toContain('Post 2')
    const changedSecondPost = wrapper?.find('#post-1')
    expect(changedSecondPost?.text()).toContain('Post 1')
  })
})
