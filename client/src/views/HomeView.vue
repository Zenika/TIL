<template>
  <ProgressSpinner v-if="loading" />
  <code v-else-if="error">{{ error }}</code>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <PostListItem :post="slotProps.data"/>
      </template>
      <template #empty>No records found.</template>
    </DataView>
  </div>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";
import PostListItem from '../components/PostListItem.vue'

let { result, loading, error } = useSubscription(gql`
  subscription getPosts {
    post(order_by: {created_at: desc}) {
      content
      created_at
    }
  }
`);

</script>