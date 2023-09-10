<script setup lang="ts">
import { usePostsStore } from '../stores/posts/usePostsStore'
import { useActionsListStore } from '../stores/actionsList/useActionsListStore'
import { IAction } from '../@types/actions'

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
        <div>
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 leading-normal"
          >
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700 text-sm">
                {{ `Moved Post ${action.id} from index ${action.from} to index ${action.to}` }}
              </p>
              <button class="text-gray-700 text-sm font-bold p-2" @click="timeTravel(action)">
                Time Travel
              </button>
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
