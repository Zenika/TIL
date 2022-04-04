<template>
  <div class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <h1>Authors:</h1>
    </div>
    <div class="col-12 flex justify-content-center">
      <ProgressSpinner v-if="loading" />
      <p v-else-if="error">{{ error }}</p>
      <ListBox
        v-else-if="result"
        :options="result.user.map(user => ({name: user.username, code: user.id}))"
        optionLabel="name"
        @change="e => $router.push(`/author/${e.value.code}`)"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result, loading, error } = useQuery(gql`
  query MyQuery {
    user {
      id
      username
    }
  }
`);
</script>

<style scoped>
</style>