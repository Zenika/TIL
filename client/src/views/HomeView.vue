<template>
  <div class="grid ">
    <div class="col flex justify-content-center">
      <ProgressSpinner v-if="loading" />
      <code v-else-if="error">{{ error }}</code>
      <div v-else-if="result.post">
        <ArticleCard
          class="article-card"
          v-for="post of result.post"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";
import ArticleCard from "../components/ArticleCard.vue";

const { result, loading, error } = useSubscription(gql`
  subscription getPosts {
    post {
      content
      created_at
      title
      id
      user {
        username
      }
    }
  }
`);
</script>

<style scoped>
.article-card {
  margin: 30px 500px 30px 500px;
}
</style>