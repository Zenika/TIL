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
  mutation insertPostWithTags(
    $url: String!
    $description: String!
    $tag1: String
    $tag2: String
    $tag3: String
  ) {
    insert_post_one(
      object: {
        url: $url
        description: $description
        post_tags: {
          data: [
            {
              tag: {
                data: { name: $tag1 }
                on_conflict: {
                  constraint: tag_name_key
                  update_columns: [name]
                }
              }
            }
            {
              tag: {
                data: { name: $tag2 }
                on_conflict: {
                  constraint: tag_name_key
                  update_columns: [name]
                }
              }
            }
            {
              tag: {
                data: { name: $tag3 }
                on_conflict: {
                  constraint: tag_name_key
                  update_columns: [name]
                }
              }
            }
          ]
        }
      }
    ) {
      id
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

const submit = ({ url, description, tags }) => {
  mutate({
    url,
    description,
    tag1: tags[0] ? tags[0] : '',
    tag2: tags[1] ? tags[1] : '',
    tag3: tags[2] ? tags[2] : '',
  });
};

onDone(() => {
  router.go(-1);
});
</script>