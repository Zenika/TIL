<template>
  <NavBar />
  <div class="grid">
    <div class="col-7 col-offset-3">
      <h1 class="font-normal">Post a new link</h1>
    </div>

    <div class="col-7 col-offset-3">
      <Card class="p-0">
        <template #content>
          <div class="field">
            <label for="url">URL</label>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-link"></i>
              </span>
              <InputText
                id="url"
                v-model="state.url"
                placeholder="https://www.your-url.com/"
                :class="{ 'p-invalid': v$.url.$error }"
              />
              <small
                id="username2-help"
                class="p-error ml-3"
                v-if="v$.url.$error"
                >{{ v$.url.$errors[0].$message }}</small
              >
            </div>
          </div>

          <div class="field">
            <label for="editor">Description</label>
            <Editor
              id="editor"
              v-model="state.description"
              editorStyle="height: 320px"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="col-7 col-offset-3">
      <Button label="Post" :loading="loading" @click="submit" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { reactive } from "vue";
import router from "../router";

import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

import useVuelidate from "@vuelidate/core";
import { required, maxLength, url } from "@vuelidate/validators";

const state = reactive({
  url: null,
  description: null,
});

const rules = {
  url: { required, url },
  description: { maxLength: maxLength(1000) },
};

const v$ = useVuelidate(rules, state);

const mutation = gql`
  mutation MyMutation($url: String!, $description: String!) {
    insert_post_one(object: { description: $description, url: $url }) {
      id
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

onDone(() => {
  router.push("/");
});

const submit = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    mutate({
      url: state.url,
      description: state.description,
    });
  }
};
</script>

<style>
.p-card-body {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>