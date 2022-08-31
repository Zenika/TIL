<template>
  <div>
    <NavBar />
    <div class="grid m-0">
      <div class="col-6 col-offset-3 mb-0">
        <h1 class="font-light">Post a new link</h1>
      </div>
      <div class="p-0 col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
        <NewPostCard @post-click="submit($event)" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import NewPostCard from "@/components/post/NewPostCard.vue";
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
      add_post_to_rss
      save_title
      uuid
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

const submit = ({ url, description, tags }: { url: string, description: string, tags: string[] }) => {
  let post_tag_insert_input: any[] = [];

  tags.forEach((tag: string) => {
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
    description: description ? description : "",
    post_tag_insert_input,
  });
};

onDone(({ data: { insert_post_one: { uuid } } }) => {
  router.push(`/post/${uuid}`);
});
</script>