<template>
  <router-view :key="[$route.fullPath, value]" @on-router-view-reload="reload"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0)

const reload = () => {
  value.value++
}
</script>

<style>
.cursor-hover:hover {
  cursor: pointer;
}

.underline-hover:hover {
  text-decoration: underline;
}

a {
  color: var(--primary-color)
}

a:hover {
  color: #1971b9;
}

.round-borders {
  border-radius: 50%;
}
</style>