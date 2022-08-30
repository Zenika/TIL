<template>
    <ConfirmDialog></ConfirmDialog>
    <DataView :value="comments" :layout="'list'">
        <template #list="slotProps">
            <CommentListItemBrief v-if="brief" :comment="slotProps.data" />
            <CommentListItem v-else :comment="slotProps.data" @delete-click="deleteComment($event)" />
        </template>
        <template #empty>
            <div class="mb-2 mt-2"><i>No comments yet.</i></div>
        </template>
    </DataView>
</template>

<script setup lang="ts">
import CommentListItem from "@/components/comment/CommentListItem.vue"
import CommentListItemBrief from "@/components/comment/CommentListItemBrief.vue"
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

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

const mutation = gql`
  mutation DeleteComment($uuid: uuid!) {
    delete_comment_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

const { mutate } = useMutation(mutation);

const deleteComment = (uuid: string) => {
    mutate({ uuid });
};
</script>