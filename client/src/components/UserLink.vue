<template>
    <span @click.stop="$router.push(`/user/${id}`)" class="cursor-hover underline-hover">{{ username }}</span>
</template>

<script setup lang="ts">
defineProps<{
    username: string,
    id: string,
}>()
</script>