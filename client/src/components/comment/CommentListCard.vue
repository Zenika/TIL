<template>
    <Card class="card">
        <template #title>
            Comments
        </template>
        <template #subtitle>
            <div class="pb-2 border-bottom-1 border-300">
                {{ comments.length }} Comments
            </div>
        </template>
        <template #content>
            <div class="container overflow-y-scroll overflow-x-hidden">
                <CommentList :comments="comments" :brief="true"/>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Comment } from '@/models/comment';
import CommentList from './CommentList.vue';

defineProps<{
    comments: Comment[],
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