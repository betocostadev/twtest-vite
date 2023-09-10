import { defineStore } from 'pinia'
import { useActionsListStore } from '../actionsList/useActionsListStore'

import postsService from '../../services/posts'
import { IPost } from 'src/@types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => {
    return {
      posts: [] as IPost[],
    }
  },

  getters: {
    getPosts: (state) => state.posts,
  },

  actions: {
    async setPosts(numPosts: number) {
      try {
        const postsData = await postsService.getPosts()
        this.posts = postsData.filter((_p: IPost, idx: number) => idx < numPosts)
      } catch (e) {
        console.log(e)
      }
    },

    goBackInTime(value: number, listOrder: number[]) {
      const postsClone = this.posts
      this.posts = []
      for (let index = 0; index < listOrder.length; index++) {
        const post = postsClone.find((post: IPost) => post.id === listOrder[index])
        if (post) {
          this.posts.push(post)
        }
      }
      const actionStore = useActionsListStore()
      actionStore.removeOlderActions(value)
    },

    movePostIndexUp(id: number) {
      const fromIndex = this.posts.findIndex((post) => id === post.id)
      const toIndex = fromIndex + 1
      if (toIndex < this.posts.length) {
        const action = useActionsListStore()
        action.addAction({
          id,
          from: fromIndex,
          to: toIndex,
          listOrder: [...this.posts.map((p) => p.id)],
        })
        this.posts.splice(toIndex, 0, this.posts.splice(fromIndex, 1)[0])
      }
    },

    movePostIndexDown(id: number) {
      const fromIndex = this.posts.findIndex((post) => id === post.id)
      const toIndex = fromIndex - 1
      if (toIndex >= 0) {
        const action = useActionsListStore()
        action.addAction({
          id,
          from: fromIndex,
          to: toIndex,
          listOrder: [...this.posts.map((p) => p.id)],
        })
        this.posts.splice(toIndex, 0, this.posts.splice(fromIndex, 1)[0])
      }
    },
  },
})
