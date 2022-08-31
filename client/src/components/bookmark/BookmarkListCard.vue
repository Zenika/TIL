<template>
    <Card class="card">
        <template #title>
            Bookmarks
        </template>
        <template #subtitle>
            <div class="pb-2 border-bottom-1 border-300">
                {{ bookmarks.length }} Bookmarks
            </div>
        </template>
        <template #content>
            <div class="container overflow-y-scroll overflow-x-hidden">
                <PostList :posts="bookmarks.map(bookmark => bookmark.post)" :brief="true" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import PostList from "@/components/post/PostList.vue";
import { Bookmark } from "@/models/bookmark";

defineProps<{
    bookmarks: Bookmark[]
}>()
</script>

<style scoped>
.container {
    max-height: 400px;
}

.card :deep(.p-card-content) {
    padding: 0;
}

.card :deep(.p-card-subtitle) {
    margin: 0;
}
</style>