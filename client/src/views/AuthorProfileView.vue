<template>
  <div v-if="loading" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <ProgressSpinner />
    </div>
  </div>

  <p v-else-if="error">{{ error }}</p>
  <div v-else-if="result" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <h1>{{ result.user_by_pk.username }}</h1>
    </div>
    <div class="col-12 flex justify-content-center mt-4">
      <h4>Articles:</h4>
    </div>
    <div class="col-12 flex justify-content-center">
      <ListBox
        :options="
          result.user_by_pk.posts.map((post) => ({
            name: post.title,
            code: post.id,
          }))
        "
        optionLabel="name"
        @change="(e) => $router.push(`/post/${e.value.code}`)"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getUser($id: String!) {
      user_by_pk(id: $id) {
        username
        posts {
          id
          title
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