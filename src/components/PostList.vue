<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '../stores/posts/usePostsStore.ts'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

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
        <div :id="`post-${index}`" class="max-w-full w-full lg:max-w-full">
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded p-2 leading-normal mb-4 h-20"
          >
            <div class="flex justify-between h-full px-1">
              <p class="text-gray-700 text-base self-center">Post {{ post.id }}</p>
              <div
                class="flex flex-col"
                :class="
                  index !== 0 && index < store.getPosts.length - 1
                    ? 'justify-between'
                    : 'justify-center'
                "
              >
                <button
                  v-if="index > 0"
                  aria-label="Move post up"
                  :class="index === 0 ? 'self-center' : ''"
                  @click="movePostUp(post.id, index)"
                >
                  <ChevronUpIcon class="h-6 w-6 text-indigo-500 hover:animate-bounce" />
                </button>
                <button
                  v-if="index < store.getPosts.length - 1"
                  aria-label="Move post down"
                  @click="movePostDown(post.id, index)"
                >
                  <ChevronDownIcon class="h-6 w-6 text-indigo-500 hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
