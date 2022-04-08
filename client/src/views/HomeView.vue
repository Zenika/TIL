<template>
  <ProgressSpinner v-if="loading" />
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
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";

const { result, loading, error } = useQuery(gql`
  query getPosts {
    post(order_by: { created_at: desc }) {
      url
      created_at
      get_title {
        error
        title
      }
    }
  }
`);
</script>