<template>
  <div v-if="loading" class="col-12 flex justify-content-center mt-6">
    <ProgressSpinner />
  </div>
  <div v-else-if="error" class="col-12 flex justify-content-center mt-6">
    <Message severity="error">Internal error</Message>
  </div>
  <div
    v-else-if="result"
    class="
      col-12
      p-0
      flex flex-column
      justify-content-center
      border-top-1 border-200
    "
  >
    <div class="w-full">
      <TextArea
        class="w-full mt-1 mb-1"
        v-model="comment.text"
        :class="{ 'p-invalid': v$.text.$error }"
        placeholder="Write your comment here"
        :autoResize="true"
      />
    </div>
    <div class="w-full flex flex-row-reverse">
      <Button
        v-if="isAuthenticated"
        @click="postComment"
        label="Comment"
        :loading="mutationLoading"
        class="p-button-sm"
      />
      <Button
        v-else
        label="Comment"
        disabled
        title="Log in to post comments"
        class="p-button-sm"
      />
    </div>
    <DataView :value="result.comment" :layout="'list'">
      <template #list="slotProps">
        <div class="col-12 p-2">
          <div class="col-12 p-0 text-sm font-semibold">
            {{ slotProps.data.user.username }}
          </div>

          <div class="col-12 p-0 font-light">
            <p class="m-0 text-justify word-wrap-break">
              <span v-html="slotProps.data.content"></span>
            </p>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="mb-2 mt-2"><i>No comments yet.</i></div>
      </template>
    </DataView>

    <small id="username2-help" class="p-error mb-1" v-if="v$.text.$error">{{
      v$.text.$errors[0].$message
    }}</small>
  </div>
</template>

<script setup lang="ts">
import { useSubscription, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { reactive, toRefs } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Comment } from '../models/comment';

const { isAuthenticated } = useAuth0();

const props = defineProps({
  postId: String,
});

const { postId } = toRefs(props);

const comment = reactive({
  text: "",
});
const rules = {
  text: { required, maxLength: maxLength(400) },
};
const v$ = useVuelidate(rules, comment);
const { loading, result, error, onResult } = useSubscription(
  gql`
    subscription MySubscription($post_uuid: uuid!) {
      comment(where: { post_uuid: { _eq: $post_uuid } }) {
        content
        user {
          username
        }
      }
    }
  `,
  {
    post_uuid: postId?.value,
  }
);

onResult(({ data: {comment} }) => {
  comment.forEach((comment: Comment) => {
    comment.content = processComment(comment.content);
  });
});

const mutation = gql`
  mutation insertCommentOne(
    $content: String!
    $post_uuid: uuid!
  ) {
    insert_comment_one(
      object: { content: $content, post_uuid: $post_uuid }
    ) {
      uuid
    }
  }
`;

const { loading: mutationLoading, mutate, onDone } = useMutation(mutation);

onDone(() => {
  comment.text = "";
  v$.value.$reset();
});

const postComment = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    mutate({
      content: comment.text,
      post_uuid: postId?.value,
    });
  }
};

const processComment = (content: string) => {
  content = content.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // PREVENT HTML INJECTION
  content = content.replace(
    /(https?:\/\/)([^ ]+)/g,
    '<a target="_blank" href="$&">$2</a>'
  ); // INSERT ANCHOR TAGS AROUND LINKS
  return content;
};
</script>

<style scoped>
.word-wrap-break {
  word-wrap: break-word;
}
</style>