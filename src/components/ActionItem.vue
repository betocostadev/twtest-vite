<script setup lang="ts">
import { IAction } from '../@types/actions'

defineProps<{ action: IAction }>()
const emit = defineEmits<{
  (e: 'timeTravel', action: IAction): void
}>()

const triggerTravel = (action: IAction) => {
  emit('timeTravel', action)
}
</script>

<template>
  <transition name="fade">
    <div class="opacity-100 transition-opacity duration-500">
      <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 leading-normal"
      >
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700 text-sm">
            {{ `Moved Post ${action.id} from index ${action.from} to index ${action.to}` }}
          </p>
          <button class="text-gray-700 text-sm font-bold p-2" @click="triggerTravel(action)">
            Time Travel
          </button>
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
