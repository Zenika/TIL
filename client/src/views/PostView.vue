<template>
  <div v-if="loading" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <ProgressSpinner />
    </div>
  </div>
  <p v-else-if="error">{{ error }}</p>
  <div v-else-if="result" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <h1>{{ result.post_by_pk.title }}</h1>
    </div>
    <div class="col-4 flex justify-content-center mt-4"></div>
    <div class="col-4 flex justify-content-center mt-4">
      <p>{{ result.post_by_pk.content }}</p>
    </div>
    <div class="col-4 flex justify-content-center mt-4"></div>
    <div class="col-12 flex justify-content-center mt-2">
      <p>Written by: {{ result.post_by_pk.user.username }}</p>
    </div>
    <div class="col-12 flex justify-content-center mt-2">
      <CommentSection :postId="route.params.id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CommentSection from "../components/CommentSection.vue";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($id: Int!) {
      post_by_pk(id: $id) {
        title
        content
        user {
          id
          username
        }
      }
    }
  `,
  {
    id: route.params.id,
  }
);
</script>

<style scoped>
</style>