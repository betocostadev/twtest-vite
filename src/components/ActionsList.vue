<script setup lang="ts">
import { usePostsStore } from '../stores/posts/usePostsStore'
import { useActionsListStore } from '../stores/actionsList/useActionsListStore'
import { IAction } from '../@types/actions'
import ActionItem from './ActionItem.vue'

defineProps<{ title: string }>()

const store = useActionsListStore()
const postsStore = usePostsStore()

const timeTravel = (action: IAction) => {
  if (action.value !== null && action.value !== undefined) {
    postsStore.goBackInTime(action.value, action.listOrder)
  }
}
</script>

<template>
  <div class="container mx-auto px-10">
    <div class="mt-8 bg-white border border-gray-100 rounded-lg shadow">
      <h2 className="text-lg text-left pl-4 font-bold my-4 text-gray-700">{{ title }}</h2>

      <div class="container flex flex-col justify-items-stretch mx-auto px-6 py-6 bg-gray-100">
        <div class="p-4" v-if="!store.getActionsList.length">
          <p class="text-gray-700 text-base">No point in time to travel to</p>
        </div>
        <transition-group name="fade" tag="div">
          <template v-for="(action, index) in store.getActionsList" :key="`action-${action.value}`">
            <ActionItem
              :action="action"
              :isFirst="index === 0"
              :isLast="index === store.getActionsList.length - 1"
              @timeTravel="timeTravel"
            />
          </template>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 0.1;
  transition: opacity 1s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
