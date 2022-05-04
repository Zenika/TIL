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
    <div class="col-6 col-offset-3 ">
      <PostCard :post="result"/>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/PostCard.vue"
import { ref, watch } from "@vue/runtime-core";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($id: Int!) {
      post_by_pk(id: $id) {
        url
        description
        created_at
        comments {
          username
        }
        get_title {
          title
        }
        user {
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
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>