<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '../stores/posts/usePostsStore.ts'
import PostItem from './PostItem.vue'

defineProps<{ title: string }>()

const store = usePostsStore()

const movePostUp = (id: number) => {
  store.movePostIndexDown(id)
}

const movePostDown = (id: number) => {
  store.movePostIndexUp(id)
}

onMounted(async () => {
  await store.setPosts(5)
})
</script>

<template>
  <div class="container mx-auto px-4">
    <h2 className="text-2xl text-left font-bold text-white my-8 pl-5">{{ title }}</h2>
    <div class="container mx-auto px-4">
      <div v-if="!store.getPosts.length">
        <p class="text-white text-base self-center">No posts to show</p>
      </div>
      <div v-for="(post, index) in store.getPosts" :key="post.id">
        <PostItem
          :post="post"
          :index="index"
          :isFirst="index === 0"
          :isLast="index === store.getPosts.length"
          @moveUp="movePostUp"
          @moveDown="movePostDown"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
