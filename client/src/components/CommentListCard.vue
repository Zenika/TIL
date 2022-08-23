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
import CommentList from './CommentList.vue';

defineProps({
    comments: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.container {
    height: 300px;
}

.card :deep(.p-card-content) {
    padding: 0;
}
</style>