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
        data-test="input"
      />
      <Button v-if="isAuthenticated" label="Post" @click="postLink" :loading="loading" />
      <Button v-else label="Post" disabled title="Log in to post a new link" />
    </div>
  </div>
  <small id="username2-help" class="p-error" v-if="v$.url.$error">{{
    v$.url.$errors[0].$message
  }}</small>
</template>

<script setup>
import gql from "graphql-tag";
import { reactive } from "vue";
import { required, url } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAuth0 } from "@auth0/auth0-vue";
import { useMutation } from "@vue/apollo-composable";

const { isAuthenticated } = useAuth0();

const emit = defineEmits(['posted'])

const state = reactive({
  url: null,
});

const rules = {
  url: { required, url },
};

const v$ = useVuelidate(rules, state);

const mutation = gql`
  mutation MyMutation($url: String!) {
    insert_post_one(object: { url: $url }) {
      id
    }
  }
`;

const { loading, mutate, onDone } = useMutation(mutation);

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
    });
  }
};
</script>

<style>
</style>