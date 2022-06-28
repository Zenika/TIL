<template>
  <div class="card-container">
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
              data-test="url"
            />
          </div>
          <small class="p-error font-light" v-if="v$.url.$error">{{
            v$.url.$errors[0].$message
          }}</small>
        </div>

        <div class="field">
          <label for="description">Description</label>
          <TextArea
            :autoResize="true"
            rows="7"
            id="description"
            v-model="state.description"
            class="w-full"
          />
          <small class="p-error font-light" v-if="v$.description.$error">{{
            v$.description.$errors[0].$message
          }}</small>
        </div>

        <div class="field">
          <div class="flex flex-column">
            <label for="tags">Tags</label>
            <small>Add up to 5 tags to describe what your post is about</small>
          </div>
          <Chips
            id="tags"
            v-model="state.tags"
            class="w-full"
            :max="5"
            :addOnBlur="true"
            :allowDuplicate="false"
            :separator="','"
          />
        </div>

        <div>
          <Button
            label="Save"
            :loading="loading"
            @click="submit"
            data-test="submit"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, url } from "@vuelidate/validators";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const props = defineProps({
  post: Object,
});

const { post } = toRefs(props);

const tags = [];

post.value.post_tags.forEach((post_tag) => {
  tags.push(post_tag.tag.name);
});

const state = reactive({
  url: post.value.url,
  description: post.value.description,
  tags,
});

const rules = {
  url: { required, url },
  description: { maxLength: maxLength(1000) },
};

const v$ = useVuelidate(rules, state);

const mutation = gql`
  mutation UpdatePostByPk($uuid: uuid!, $description: String!, $url: String!) {
    update_post_by_pk(
      pk_columns: { uuid: $uuid }
      _set: { url: $url, description: $description }
    ) {
      uuid
    }
  }
`;

const { mutate, onDone, loading } = useMutation(mutation);

onDone((res) => {
  console.log(res);
});

const submit = () => {
  mutate({
    uuid: post.value.uuid,
    url: state.url,
    description: state.description,
  });
};
</script>

<style scoped>
.card-container :deep(.p-card-content) {
  padding: 0;
}

.card-container :deep(.p-chips-multiple-container) {
  width: 100%;
}
</style>