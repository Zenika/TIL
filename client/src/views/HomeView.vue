<template>
  <NewPostInput @posted="refetch" />
  <ProgressSpinner v-if="loading" class="spinner" />
  <code v-else-if="error">{{ error }}</code>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <PostListItem :post="slotProps.data" />
      </template>
      <template #empty>
        <div>No articles found.</div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import NewPostInput from "../components/NewPostInput.vue";
import { useQuery } from "@vue/apollo-composable";

const { result, loading, error, refetch } = useQuery(
  gql`
    query getPosts {
      post(order_by: { created_at: desc }) {
        url
        created_at
        get_title {
          error
          title
        }
        user {
          username
        }
      }
    }
  `,
  {},
  { notifyOnNetworkStatusChange: true }
);
</script>

<style scoped>
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>