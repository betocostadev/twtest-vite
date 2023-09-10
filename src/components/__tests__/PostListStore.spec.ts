// import { mount } from '@vue/test-utils'
// import { createTestingPinia } from '@pinia/testing'
// import { usePostsStore } from '../../stores/posts/usePostsStore'
// import PostList from '../PostList.vue'

// const wrapper = mount(PostList, {
//   global: {
//     plugins: [createTestingPinia()],
//   },
// })

// const store = usePostsStore()

// describe('PostList', () => {
//   beforeEach(async () => {})

//   it('starts with 0 posts', () => {
//     expect(store.posts.length).toBe(0)
//   })

//   it('has 1 post', async () => {
//     const posts = [
//       {
//         body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//         id: 1,
//         title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//         userId: 1,
//       },
//     ]
//     store.$patch({ posts: posts })
//     expect(store.posts.length).toBe(1)
//   })
// })
