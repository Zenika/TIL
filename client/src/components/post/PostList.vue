<template>
  <DataView :value="posts" :layout="'list'" class="data-view">
    <template #header v-if="!brief">
      <div class="p-0 flex justify-content-between">
        <div class="flex align-items-center">
          <span class="mr-2">Show</span>
          <Dropdown v-model="selectedPostNbOptions" :options="postNbOptions" optionLabel="name" optionValue="code" />
        </div>
        <Button @click="emit('on-refresh')" label="Refresh" icon="pi pi-refresh"
          class="p-button-sm p-button-outlined p-button-secondary" />
      </div>
    </template>
    <template #list="slotProps">
      <PostListItemBrief v-if="brief" :post="slotProps.data" />
      <PostListItem v-else :post="slotProps.data" @delete-click="deletePost($event)" />
    </template>
    <template #empty>
      <div class="mb-2 mt-2"><i>No posts yet.</i></div>
    </template>
  </DataView>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import PostListItem from "@/components/post/PostListItem.vue";
import PostListItemBrief from "@/components/post/PostListItemBrief.vue";
import gql from 'graphql-tag';
import { ref, watch } from 'vue';
import { Post } from '@/models/post';

defineProps<{
  posts: Post[],
  brief?: boolean
}>()

const emit = defineEmits(["on-refresh", "on-post-nb-change"]);

const selectedPostNbOptions = ref(localStorage.getItem("postNbOption") || '25');
const postNbOptions = ref([
  { name: '25', code: '25' },
  { name: '50', code: '50' },
  { name: '100', code: '100' },
  { name: '250', code: '250' }
]);

watch(selectedPostNbOptions, value => {
  localStorage.setItem("postNbOption", value)
  emit("on-post-nb-change", value);
})

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