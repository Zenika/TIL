<template>
    <DataView :value="tags" :layout="'list'" class="data-view">
        <template #list="slotProps">
            <div class="w-full p-2">
                <TagListItem :tag="slotProps.data"/>
            </div>
        </template>
        <template #empty>
            <div class="mb-2 mt-2"><i>No tags yet.</i></div>
        </template>
    </DataView>
</template>

<script setup lang="ts">
import { Tag } from '@/models/tag';
import TagListItem from './TagListItem.vue';

defineProps<{
  tags: Tag[]
}>()
</script>

<style>
</style>