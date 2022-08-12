<template>
    <DataView :value="posts" :layout="'list'">
        <template #header>
            <Button @click="emit('on-refresh')" label="Refresh" icon="pi pi-refresh"
                class="p-button-sm p-button-outlined p-button-secondary" />
        </template>
        <template #list="slotProps">
            <PostListItem :post="slotProps.data" @delete-click="deletePost($event)" />
        </template>
        <template #empty>
            <div>No articles found.</div>
        </template>
    </DataView>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import PostListItem from "../components/PostListItem.vue";
import gql from 'graphql-tag';

defineProps({
    posts: {
        type: Object,
        require: true
    },
});

const emit = defineEmits(["on-refresh"]);

const mutation = gql`
  mutation DeletePost($uuid: uuid!) {
    delete_comment(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_tag(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_bookmark(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

const { mutate, onDone } = useMutation(mutation);

onDone(() => emit("on-refresh"));

const deletePost = (uuid: string) => {
    mutate({ uuid });
};
</script>