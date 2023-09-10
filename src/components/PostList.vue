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
  <div class="container mx-auto px-8">
    <h2 className="text-2xl text-left font-bold text-white my-8 pl-5">{{ title }}</h2>
    <div class="container mx-auto px-4">
      <div
        v-if="!store.getPosts.length"
        class="bg-white rounded-b lg:rounded p-2 leading-normal mb-2 h-20 shadow flex justify-center"
      >
        <p class="text-gray-800 text-base self-center">No posts to show</p>
      </div>
      <transition-group name="list" tag="ul" mode="out-in">
        <li v-for="(post, index) in store.getPosts" :key="post.id">
          <PostItem
            :post="post"
            :index="index"
            :isFirst="index === 0"
            :isLast="index === store.getPosts.length - 1"
            @move-up="movePostUp"
            @move-down="movePostDown"
          />
        </li>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.65s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
