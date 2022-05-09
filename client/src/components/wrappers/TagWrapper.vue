<template>
  <Tag
    class="hover:text-100 cursor-hover"
    :value="value"
    @click="$router.push(`/tags/${value}?p=1`)"
  />
</template>

<script setup>
const props = defineProps({
  value: String,
});
</script>

<style scoped>
.cursor-hover:hover {
  cursor: pointer;
}
</style>