<template>
  <router-view :key="$route.fullPath" />
</template>

<script setup>
</script>

<style>
.cursor-hover:hover {
  cursor: pointer;
}

a {
  color: var(--primary-color)
}

a:hover {
  color: #1971b9;
}
</style>