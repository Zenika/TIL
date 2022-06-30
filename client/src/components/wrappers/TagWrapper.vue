<template>
  <Tag
    class="hover:text-300 cursor-hover"
    :value="value"
    @click.stop="$router.push(`/tags/${value}?p=1`)"
  />
</template>

<script setup>
const props = defineProps({
  value: String,
});
</script>