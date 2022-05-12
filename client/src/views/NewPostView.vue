<template>
  <NavBar />
  <div class="grid m-0">
    <div class="col-6 col-offset-3 mb-0">
      <h1 class="font-light">Post a new link</h1>
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
  mutation insertPostWithTags(
    $description: String!
    $url: String!
    $post_tag_insert_input: [post_tag_insert_input!]!
  ) {
    insert_post_one(
      object: {
        url: $url
        description: $description
        post_tags: { data: $post_tag_insert_input }
      }
    ) {
      uuid
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

const submit = ({ url, description, tags }) => {
  let post_tag_insert_input = [];

  tags.forEach((tag) => {
    post_tag_insert_input.push({
      tag: {
        data: { name: tag.toLowerCase() },
        on_conflict: {
          constraint: "tag_name_key",
          update_columns: ["blank"],
        },
      },
    });
  });

  mutate({
    url,
    description,
    post_tag_insert_input,
  });
};

onDone(() => {
  router.go(-1);
});
</script>