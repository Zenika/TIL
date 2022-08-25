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
      <PostCard :post="result.post_by_pk" @delete-click="deletePost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/post/PostCard.vue";

const route = useRoute();
const router = useRouter();

const { loading, result, error } = useQuery(
  gql`
    query getPost($uuid: uuid!) {
      post_by_pk(uuid: $uuid) {
        url
        uuid
        description
        created_at
        title
        user {
          username
          id
        }
        post_tags(order_by: { tag: { name: asc } }) {
          tag {
            name
          }
        }
        bookmarks {
          uuid
        }
      }
    }
  `,
  {
    uuid: route.params.id,
  }
);

const mutation = gql`
  mutation DeletePost($uuid: uuid!) {
    delete_comment(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_tag(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_bookmark(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

const { mutate, onDone } = useMutation(mutation);

onDone(() => router.push(`/`));

const deletePost = () => {
  mutate({ uuid: route.params.id });
};
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