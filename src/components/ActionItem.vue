<script setup lang="ts">
import { IAction } from '../@types/actions'

defineProps<{ action: IAction; isFirst: boolean; isLast: boolean }>()
const emit = defineEmits<{
  (e: 'timeTravel', action: IAction): void
}>()

const triggerTravel = (action: IAction) => {
  emit('timeTravel', action)
}
</script>

<template>
  <div
    class="border border-gray-300 bg-white p-2"
    :class="isFirst ? 'rounded-t' : isLast ? 'rounded-b' : 'rounded-none'"
  >
    <div class="mb-2 flex justify-evenly items-center">
      <p class="text-gray-700 text-sm">
        {{ `Moved Post ${action.id} from index ${action.from} to index ${action.to}` }}
      </p>
      <button
        class="text-primary text-sm font-bold py-2 px-4 bg-green-400 rounded-sm"
        @click="triggerTravel(action)"
      >
        Time Travel
      </button>
    </div>
  </div>
</template>

<style scoped></style>
