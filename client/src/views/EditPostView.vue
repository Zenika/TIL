<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" class="mt-5" severity="error">
    Internal error
  </Message>
  <div v-else-if="result" class="grid m-0 mt-2">
    <div class="col-6 col-offset-3">
      <Button
        label="Return"
        class="p-button-plain p-button-text"
        icon="pi pi-angle-left"
        @click="$router.go(-1)"
      />
    </div>
    <div class="col-6 col-offset-3">
      <EditPostCard :post="result.post_by_pk" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import NavBar from "@/components/NavBar.vue";
import EditPostCard from "@/components/EditPostCard.vue";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($uuid: uuid!) {
      post_by_pk(uuid: $uuid) {
        url
        description
        uuid
        post_tags(order_by: { tag: { name: asc } }) {
          tag {
            name
          }
        }
      }
    }
  `,
  {
    uuid: route.params.id,
  }
);
</script>

<style scoped>
</style>