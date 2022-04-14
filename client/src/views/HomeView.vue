<template>
  <ProgressSpinner v-if="loading" class="spinner" />
  <code v-else-if="error">{{ error }}</code>
  <div v-else-if="result.post">
    <Button label="refetch" @click="refetch" />
    <NewPostInput v-if="isAuthenticated" />
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
import { useQueryAuth0 } from '@/composables/useQueryAuth0'
import gql from "graphql-tag";
import { useAuth0 } from "@auth0/auth0-vue";
import PostListItem from "../components/PostListItem.vue";
import NewPostInput from "../components/NewPostInput.vue";

const { isAuthenticated } = useAuth0();

const { result, loading, error, refetch } = useQueryAuth0(gql`
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
`);
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