<template>
  <div v-if="loading" class="col-12 flex justify-content-center mt-6">
    <ProgressSpinner />
  </div>
  <div v-else-if="error" class="col-12 flex justify-content-center mt-6">
    <p>{{ error }}</p>
  </div>
  <div
    v-else-if="result"
    class="col-4 flex flex-column justify-content-center mt-2 border comment"
  >
    <DataView :value="result.comment" :layout="'list'">
      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <div class="col-12">
              <b>{{ slotProps.data.username }}</b>
            </div>

            <div class="col-12">{{ slotProps.data.content }}</div>
            <hr />
          </div>
        </div>
      </template>
    </DataView>
    <!-- <p v-else>No comment yet</p> -->
    <div class="w-full">
      <TextArea
        class="w-full mt-1 mb-1"
        v-model="comment.text"
        :class="{'p-invalid':v$.text.$error}"
        placeholder="Write your comment here"
        :autoResize="true"
      />
    </div>
    <small id="username2-help" class="p-error" v-if="v$.text.$error">{{
    v$.text.$errors[0].$message
  }}</small>
    <div class="w-full">
      <Button
        v-if="isAuthenticated"
        @click="postComment"
        label="Post comment"
        :loading="mutationLoading"
      />
      <Button
        v-else
        label="Post comment"
        disabled
        title="Log in to post comments"
      />
    </div>
  </div>
</template>

<script setup>
import { useSubscription, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { reactive, ref, toRefs } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { required , maxLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const { isAuthenticated } = useAuth0();

const props = defineProps({
  postId: String,
});

const { postId } = toRefs(props);


const comment = reactive({
  text: ""
});
const rules = {
  text: {required , maxLength: maxLength(400) }
}
const v$ = useVuelidate(rules, comment);
const { loading, result, error  } = useSubscription(
  gql`
    subscription getComments($postId: Int!) {
      comment(where: { post_id: { _eq: $postId } }) {
        # id
        content
        username
      }
    }
  `,
  {
    postId: postId.value,
  }
);


const mutation = gql`
  mutation insertCommentOne(
    $content: String!
    $post_id: Int!
    $username: String!
  ) {
    insert_comment_one(
      object: { content: $content, post_id: $post_id, username: $username }
    ) {
      username
    }
  }
`;

const { loading: mutationLoading, mutate, onDone } = useMutation(mutation);

onDone(() => {
  comment.text = "";
  v$.value.$reset();
});

const user = JSON.parse(sessionStorage.getItem("user"));


const postComment = () => {
  v$.value.$validate();
  if(!v$.value.$error){
  mutate({
    content: comment.text,
    username: user ? user.nickname : "Anon",
    post_id: postId.value,
  });
  }
};
</script>

<style scoped>
.comment {
  background-color: #f8f9fa;
}
</style>