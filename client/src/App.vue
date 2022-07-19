<template>
  <router-view :key="$route.fullPath" />
</template>

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

.round-borders {
  border-radius: 50%;
}
</style>