<template>
  <div class="col-12 md:col-4">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-link"></i>
      </span>
      <InputText
        placeholder="Post a new link"
        v-model="state.url"
        :class="{ 'p-invalid': v$.url.$error }"
      />
      <Button label="Post" @click="postLink" :loading="loading" />
    </div>
  </div>
  <small id="username2-help" class="p-error" v-if="v$.url.$error">{{
    v$.url.$errors[0].$message
  }}</small>
</template>

<script setup>
import gql from "graphql-tag";
import { reactive } from "vue";
import { useMutationAuth0 } from "../composables/useMutationAuth0";
import { required, url } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const emit = defineEmits(['posted'])

const state = reactive({
  url: null,
});

const rules = {
  url: { required, url },
};

const v$ = useVuelidate(rules, state);

const mutation = gql`
  mutation MyMutation($url: String!, $user_id: String!) {
    insert_post_one(object: { url: $url, user_id: $user_id }) {
      id
    }
  }
`;

const { loading, mutate, onDone } = useMutationAuth0(mutation);

onDone(() => {
  state.url = "";
  v$.value.$reset()
  emit('posted')
});

const postLink = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    mutate({
      url: state.url,
      user_id: JSON.parse(sessionStorage.getItem("user")).sub,
    });
  }
};
</script>

<style>
</style>