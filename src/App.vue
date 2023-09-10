<script setup lang="ts">
import PostList from './components/PostList.vue'
import ActionsList from './components/ActionsList.vue'
</script>

<template>
  <div class="relative h-screen">
    <div
      class="absolute w-0 h-0 border-t-[0px] border-t-transparent border-l-[1280px] border-l-primary border-b-[250px] border-b-transparent"
    ></div>

    <div class="relative pt-6 flex w-full justify-evenly">
      <PostList title="Sortable Post List" />
      <ActionsList title="List of actions commited" />
    </div>
  </div>
</template>

<style scoped></style>
