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
  <div class="container mx-auto px-4">
    <div class="max-w-sm mt-8 bg-white border border-gray-200 rounded-lg shadow py-1">
      <h2 className="text-lg text-left pl-4 font-bold my-4 text-gray-700">{{ title }}</h2>

      <div class="px-2" v-if="!store.getActionsList.length">
        <p class="text-gray-700 text-base">No point in time to travel to</p>
      </div>

      <div
        class="bg-gray-200 px-2"
        v-for="action in store.getActionsList"
        :key="`action-${action.id}`"
      >
        <ActionItem :action="action" @timeTravel="timeTravel" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
