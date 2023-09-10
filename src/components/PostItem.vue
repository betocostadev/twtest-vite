<script setup lang="ts">
import { IPost } from 'src/@types/posts'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps<{ post: IPost; index: number; isFirst: boolean; isLast: boolean }>()
const emit = defineEmits<{
  (e: 'moveUp', id: number): void
  (e: 'moveDown', id: number): void
}>()

const triggerMoveUp = (id: number) => {
  emit('moveUp', id)
}
const triggerMoveDown = (id: number) => {
  emit('moveDown', id)
}
</script>

<template>
  <transition name="fade">
    <div :id="`post-${index}`" class="max-w-full w-full lg:max-w-full">
      <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded p-2 leading-normal mb-4 h-20"
      >
        <div class="flex justify-between h-full px-1">
          <p class="text-gray-700 text-base self-center">{{ `Post ${post.id}` }}</p>
          <div
            class="flex flex-col"
            :class="!isFirst && !isLast ? 'justify-between' : 'justify-center'"
          >
            <button
              v-if="!isFirst"
              aria-label="Move post up"
              :class="index === 0 ? 'self-center' : ''"
              @click="triggerMoveUp(post.id)"
            >
              <ChevronUpIcon class="h-6 w-6 text-indigo-500 hover:animate-bounce" />
            </button>
            <button v-if="!isLast" aria-label="Move post down" @click="triggerMoveDown(post.id)">
              <ChevronDownIcon class="h-6 w-6 text-indigo-500 hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
