<template>
    <Card class="card">
        <template #title>
            Posts
        </template>
        <template #subtitle>
            <div class="pb-2 border-bottom-1 border-300">
                {{ posts.length }} Posts
            </div>
        </template>
        <template #content>
            <div class="container overflow-y-scroll overflow-x-hidden">
                <PostList :posts="posts" :brief="true" />
            </div>
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
.container {
    height: 400px;
}

.card :deep(.p-card-content) {
    padding: 0;
}

.card :deep(.p-card-subtitle) {
    margin: 0;
}
</style>