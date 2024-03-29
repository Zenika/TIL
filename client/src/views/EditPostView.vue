<template>
  <div>
    <NavBar />
    <ProgressSpinner v-if="loading" class="spinner" />
    <Message v-else-if="error" class="mt-5" severity="error">
      Internal error
    </Message>
    <div v-else-if="result" class="grid m-0 mt-2">
      <div class="p-0 col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
        <Button label="Return" class="p-button-plain p-button-text" icon="pi pi-angle-left" @click="$router.go(-1)" />
      </div>
      <div class="p-0 col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
        <EditPostCard @update-click="update($event)" :post="result.post_by_pk" :loading="mutationLoading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import NavBar from "@/components/NavBar.vue";
import EditPostCard from "@/components/post/EditPostCard.vue";
import router from "@/router";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($uuid: uuid!) {
      post_by_pk(uuid: $uuid) {
        uuid
        url
        description
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

const mutation = gql`
  mutation UpdatePostByPk(
    $uuid: uuid!
    $description: String!
    $url: String!
    $post_tag_insert_input: [post_tag_insert_input!]!
  ) {
    update_post_by_pk(
      pk_columns: { uuid: $uuid }
      _set: { url: $url, description: $description }
    ) {
      add_post_to_rss
      save_title
    }
    delete_post_tag(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    insert_post_tag(objects: $post_tag_insert_input) {
      affected_rows
    }
  }
`;

const { mutate, onDone, loading: mutationLoading } = useMutation(mutation);

onDone(() => {
  router.go(-1);
});

const update = ({ url, description, tags }: { url: string, description: string, tags: string[] }) => {
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
      post_uuid: route.params.id
    });
  });

  mutate({
    url,
    description: description ? description : "",
    post_tag_insert_input,
    uuid: route.params.id,
  });
};
</script>

<style scoped>
</style>