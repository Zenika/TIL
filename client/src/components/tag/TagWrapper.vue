<template>
  <Tag
    class="hover:text-300 cursor-hover"
    :value="value"
    @click.stop="$router.push(`/tags/${encodeURIComponent(value)}?p=1`)"
  />
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>