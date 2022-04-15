<template>
  <div class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <h1>Write a new article:</h1>
    </div>
    <div class="col-12 flex justify-content-center mt-2">
      <InputText v-model="state.title" placeholder="title" />
      <InlineMessage class="ml-2" v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</InlineMessage>
    </div>
    <div class="col-12 flex justify-content-center">
      <TextArea v-model="state.content" placeholder="content" />
      <InlineMessage class="ml-2" v-if="v$.content.$error">{{ v$.content.$errors[0].$message }}</InlineMessage>
    </div>
    <div class="col-12 flex justify-content-center mt-2">
      <Button label="Post" :loading="loading" @click="submit" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import router from "../router";

import { useMutationAuth0 } from "@/composables/useMutationContext";
import gql from "graphql-tag";

import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength } from "@vuelidate/validators";


const state = reactive({
  title: null,
  content: null,
});

const rules = {
  title: { required }, // Matches state.firstName
  content: { required, minLength: minLength(140), maxLength: maxLength(1000) }, // Matches state.lastName
};

const v$ = useVuelidate(rules, state);

const mutation = gql`
  mutation MyMutation($title: String!, $content: String!, $user_id: String!) {
    insert_post_one(
      object: { content: $content, title: $title, user_id: $user_id }
    ) {
      id
    }
  }
`;

const { mutate, onDone, loading } = useMutationAuth0(mutation);

onDone(() => {
  router.push("/fhgfh?page=1");
});

const submit = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    mutate({
      title: state.title,
      content: state.content,
      user_id: JSON.parse(sessionStorage.getItem("user")).sub,
    });
  }
};
</script>

<style>
</style>