<template>
    <Card class="card">
        <template #title>
            Tags
        </template>
        <template #subtitle>
            <div class="pb-2 border-bottom-1 border-300">
                {{ tags.length }} Tags
            </div>
        </template>
        <template #content>
            <div class="container overflow-y-scroll overflow-x-hidden">
                <TagList :tags="tags"/>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Tag } from '@/models/tag';
import TagList from './TagList.vue';

defineProps<{
  tags: Tag[]
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