<script setup lang="ts">
import PostList from './components/PostList.vue'
import ActionsList from './components/ActionsList.vue'
</script>

<template>
  <div class="relative h-screen">
    <div
      class="absolute bg-clip-border z-0 w-full bg-purple-500 h-60 after:content-[' '] border-t-0 border-teal-400 w-0 border-r-indigo-700"
    ></div>

    <div class="relative pt-6 flex w-full z-10">
      <PostList title="Sortable Post List" />
      <ActionsList title="List of actions commited" />
    </div>
  </div>
</template>

<style scoped></style>
