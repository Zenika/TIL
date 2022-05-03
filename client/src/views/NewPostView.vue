<template>
  <NavBar />
  <div class="grid m-0">
    <div class="col-6 col-offset-3 mb-0">
      <h1 class="font-normal">Post a new link</h1>
    </div>
    <div class="col-6 col-offset-3">
      <NewPostCard @post-click="submit($event)" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import NewPostCard from "@/components/NewPostCard.vue";
import router from "../router";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const mutation = gql`
  mutation MyMutation($url: String!, $description: String!) {
    insert_post_one(object: { description: $description, url: $url }) {
      id
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

const submit = ({ url, description }) => {
  mutate({
    url,
    description,
  });
};

onDone(() => {
  router.go(-1);
});
</script>