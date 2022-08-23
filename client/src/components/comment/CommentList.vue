<template>
    <DataView :value="comments" :layout="'list'">
        <template #list="slotProps">
            <CommentListItemBrief v-if="brief" :comment="slotProps.data" />
            <CommentListItem v-else :comment="slotProps.data"/>
        </template>
        <template #empty>
            <div class="mb-2 mt-2"><i>No comments yet.</i></div>
        </template>
    </DataView>
</template>

<script setup lang="ts">
import CommentListItem from "@/components/comment/CommentListItem.vue"
import CommentListItemBrief from "@/components/comment/CommentListItemBrief.vue"

defineProps({
    comments: {
        type: Object,
        require: true
    },
    brief: {
        type: Boolean,
        default: false
    }
});
</script>