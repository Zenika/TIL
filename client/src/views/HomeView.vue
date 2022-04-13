<template>
  <div class="container">
    <div class="A">
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
    </div>

    <div class="B">
      <Paginator></Paginator>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";

const { result, loading, error, refetch } = useQuery(gql`
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

<style scoped>
.container {
  height: 100%;
}

.A {
  height: 94%;
  overflow: scroll;
  background-color: blue;
}

.B {
  height: 6%;
  background-color: green;
}
</style>