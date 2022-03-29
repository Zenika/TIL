<template>
  <div v-if="loading" class="col-12 flex justify-content-center mt-6">
    <ProgressSpinner />
  </div>
  <div v-else-if="error" class="col-12 flex justify-content-center mt-6">
    <p>{{ error }}</p>
  </div>
  <div
    v-else-if="result"
    class="col-4 flex flex-column justify-content-center mt-2 border"
  >
    <div class="w-full" v-if="result.comment.length > 0">
      <div v-for="comment in result.comment" :key="comment.id">
        <p class="m-0 border-bottom-1 border-300">
          {{ comment.content }}<br /><b>{{ comment.username }}</b>
        </p>
      </div>
    </div>
    <p v-else>No comment yet</p>
    <div class="w-full">
      <TextArea
        class="w-full mt-1 mb-1"
        v-model="comment"
        placeholder="Write your comment here"
        :autoResize="true"
      />
    </div>
    <div class="w-full">
      <Button
        @click="postComment"
        label="Post comment"
        :loading="mutationLoading"
      />
    </div>
  </div>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, toRefs } from "vue";
import { useMutationAuth0 } from '../composables/useMutationContext'


const props = defineProps({
  postId: String,
});

const { postId } = toRefs(props);

const { loading, result, error } = useSubscription(
  gql`
    subscription getComments($postId: Int!) {
      comment(where: { post_id: { _eq: $postId } }) {
        id
        content
        username
      }
    }
  `,
  {
    postId: postId.value,
  }
);

let comment = ref("");

const mutation = gql`
  mutation insertCommentOne(
    $content: String!
    $post_id: Int!
    $username: String!
  ) {
    insert_comment_one(
      object: { content: $content, post_id: $post_id, username: $username }
    ) {
      id
    }
  }
`;

const {
  loading: mutationLoading,
  mutate,
  onDone,
} = useMutationAuth0(mutation);

onDone(() => {
  comment.value = "";
});

const user = JSON.parse(sessionStorage.getItem("user"));

const postComment = () => {
  mutate({
    content: comment.value,
    username: user ? user.nickname : "Anon",
    post_id: postId.value,
  });
};
</script>

<style scoped>
</style>