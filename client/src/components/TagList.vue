<template>
    <DataView :value="tags" :layout="'list'" class="data-view">
        <template #list="slotProps">
            <div class="w-full p-2">
                <TagWrapper :value="slotProps.data" />
            </div>
        </template>
        <template #empty>
            <div>No tags found.</div>
        </template>
    </DataView>
</template>

<script setup lang="ts">
import TagWrapper from './wrappers/TagWrapper.vue';

defineProps({
    tags: {
        type: Array,
        required: true
    }
});
</script>

<style>
</style>