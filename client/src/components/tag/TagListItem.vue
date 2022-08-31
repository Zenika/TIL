<template>
    <TagWrapper :value="tag.name" /> <span v-if="tag.post_tags_aggregate">({{tag.post_tags_aggregate.aggregate.count}})</span>
</template>

<script setup lang="ts">
import { Tag } from '@/models/tag';
import TagWrapper from './TagWrapper.vue';

defineProps<{
  tag: Tag
}>()
</script>