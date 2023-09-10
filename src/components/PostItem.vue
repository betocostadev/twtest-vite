<script setup lang="ts">
import { IPost } from 'src/@types/posts'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps<{ post: IPost; index: number; isFirst: boolean; isLast: boolean }>()
const emit = defineEmits<{
  (e: 'move-up', id: number): void
  (e: 'move-down', id: number): void
}>()

const triggerMoveUp = (id: number) => {
  emit('move-up', id)
}
const triggerMoveDown = (id: number) => {
  emit('move-down', id)
}
</script>

<template>
  <div :id="`post-${index}`" class="max-w-full w-full lg:max-w-full py-2">
    <div class="bg-white rounded-b lg:rounded p-2 leading-normal mb-2 h-20 shadow">
      <div class="flex justify-between h-full px-1">
        <p class="text-gray-700 text-base self-center">{{ `Post ${post.id}` }}</p>
        <div
          class="flex flex-col"
          :class="!isFirst && !isLast ? 'justify-between' : 'justify-center'"
        >
          <button
            v-if="!isFirst"
            aria-label="Move post up"
            class="hover:animate-bounce"
            :class="index === 0 ? 'self-center' : ''"
            @click="triggerMoveUp(post.id)"
          >
            <ChevronUpIcon class="h-6 w-6 text-primary" />
          </button>
          <button
            v-if="!isLast"
            aria-label="Move post down"
            class="hover:animate-bounce"
            @click="triggerMoveDown(post.id)"
          >
            <ChevronDownIcon class="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
