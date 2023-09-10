import { VueWrapper, mount } from '@vue/test-utils'
import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import ActionsList from '../ActionsList.vue'
import { useActionsListStore } from '../../stores/actionsList/useActionsListStore'
import { usePostsStore } from '../../stores/posts/usePostsStore'
import PostList from '../PostList.vue'

const app = createApp({})
describe('ActionsList', () => {
  let wrapper: VueWrapper | null = null

  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)

  beforeEach(() => {
    wrapper = mount(ActionsList, {
      props: { title: 'List of actions commited' },
    })
  })

  it('renders properly', () => {
    expect(ActionsList).toBeTruthy()
    expect(wrapper?.text()).toContain('List of actions commited')
  })

  it('starts with no actions in list', () => {
    expect(ActionsList).toBeTruthy()
    expect(wrapper?.text()).toContain('No point in time to travel to')
    const store = useActionsListStore()
    const spy = vi.spyOn(store, 'addAction')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('adds actions to the list', async () => {
    expect(ActionsList).toBeTruthy()
    expect(wrapper?.text()).toContain('No point in time to travel to')

    const postsList = mount(PostList, {
      props: { title: 'List of actions commited' },
    })

    const storePosts = usePostsStore()
    const spyPosts = vi.spyOn(storePosts, 'setPosts')
    await storePosts.setPosts(5)
    expect(spyPosts).toHaveBeenCalledTimes(1)
    expect(storePosts.getPosts.length).toBe(5)

    const firstPost = postsList.find('#post-0')
    expect(firstPost?.text()).toContain('Post 1')
    await firstPost?.get('button').trigger('click')
    await firstPost?.get('button').trigger('click')

    const storeActions = useActionsListStore()
    expect(storeActions.getActionsList.length).toBe(2)
    expect(storeActions.getActionsList[0].from).toBe(0)
    expect(storeActions.getActionsList[0].to).toBe(1)
  })

  it('travels back in time and clears the list', async () => {
    expect(ActionsList).toBeTruthy()

    const postsList = mount(PostList, {
      props: { title: 'List of actions commited' },
    })

    const storePosts = usePostsStore()
    const spyPosts = vi.spyOn(storePosts, 'setPosts')
    await storePosts.setPosts(5)
    expect(spyPosts).toHaveBeenCalledTimes(1)
    expect(storePosts.getPosts.length).toBe(5)

    const firstPost = postsList.find('#post-0')
    expect(firstPost?.text()).toContain('Post 1')
    await firstPost?.get('button').trigger('click')
    await firstPost?.get('button').trigger('click')

    const storeActions = useActionsListStore()
    const spyActions = vi.spyOn(storeActions, 'removeOlderActions')
    expect(storeActions.getActionsList.length).toBe(4)
    const timeTravel = wrapper?.findAll('button')[0]
    await timeTravel?.trigger('click')
    expect(spyActions).toHaveBeenCalledTimes(1)
    expect(wrapper?.text()).toContain('No point in time to travel to')
    const newFirstPost = postsList.find('#post-0')
    const newSecondPost = postsList.find('#post-1')
    expect(newFirstPost?.text()).toContain('Post 1')
    expect(newSecondPost?.text()).toContain('Post 2')
  })

  it('travels back in time one step and keep the list', async () => {
    // List will start empty in this test
    expect(ActionsList).toBeTruthy()

    const postsList = mount(PostList, {
      props: { title: 'List of actions commited' },
    })

    const storePosts = usePostsStore()
    const spyPosts = vi.spyOn(storePosts, 'setPosts')
    await storePosts.setPosts(5)
    expect(spyPosts).toHaveBeenCalledTimes(1)
    expect(storePosts.getPosts.length).toBe(5)

    const firstPost = postsList.find('#post-0')
    expect(firstPost?.text()).toContain('Post 1')
    await firstPost?.get('button').trigger('click')
    await firstPost?.get('button').trigger('click')
    const fifthPost = postsList.find('#post-4')
    await fifthPost?.get('button').trigger('click')

    const storeActions = useActionsListStore()
    const spyActions = vi.spyOn(storeActions, 'removeOlderActions')
    expect(storeActions.getActionsList.length).toBe(3)
    const timeTravel = wrapper?.findAll('button')[1]
    await timeTravel?.trigger('click')
    expect(spyActions).toHaveBeenCalledTimes(1)
    expect(storeActions.getActionsList.length).toBe(1)
    expect(wrapper?.text()).toContain('Moved Post')
  })
})
