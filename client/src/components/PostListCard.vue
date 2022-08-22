<template>
    <Card class="card overflow-y-scroll overflow-x-hidden">
        <template #title>
            Posts
        </template>
        <template #subtitle>
            <div class="pb-2 border-bottom-1 border-300">
                {{ posts.length }} Posts
            </div>
        </template>
        <template #content>
            <PostList :posts="posts" :brief="true" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import PostList from "@/components/PostList.vue";

defineProps({
  posts: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.card {
    height: 300px;
}
.card :deep(.p-card-content) {
  padding: 0;
}
</style>