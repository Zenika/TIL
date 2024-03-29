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
            <InputText id="url" v-model="state.url" placeholder="https://www.your-url.com/"
              :class="{ 'p-invalid': v$.url.$error }" data-test="url" />
          </div>
          <small class="p-error font-light" v-if="v$.url.$error">{{
              v$.url.$errors[0].$message
          }}</small>
        </div>

        <div class="field">
          <label for="description">Description</label>
          <TextArea :autoResize="true" rows="7" id="description" v-model="state.description" class="w-full"
            data-test="description" />
          <small class="p-error font-light" v-if="v$.description.$error">{{
              v$.description.$errors[0].$message
          }}</small>
        </div>

        <div class="field">
          <div class="flex flex-column">
            <label for="tags">Tags</label>
            <small>Add up to 5 tags to describe what your post is about</small>
          </div>
          <SearchChips :tags="tags" @update="onChipsUpdate($event)"/>
        </div>

        <div>
          <Button label="Save" :loading="loading" @click="submit" data-test="submit" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, url } from "@vuelidate/validators";
import { escapeHtml } from "@/filters/escapeHtmlFilter";
import SearchChips from "@/components/search/SearchChips.vue"
import { Post } from '@/models/post';
import { Tag } from "@/models/tag";

const emit = defineEmits(["update-click"]);

const props = defineProps<{
  post: Post,
  loading: boolean,
}>()

const { post } = toRefs(props);

const tags = (post.value.post_tags.map(({tag: {name}}) => ({ name })) as Tag[])

const state = reactive({
  url: post.value.url,
  description: post.value.description,
  tags: post.value.post_tags.map(post_tag => post_tag.tag.name),
});

const rules = {
  url: { required, url },
  description: { maxLength: maxLength(1000) },
  tags: { maxLength: maxLength(5) },
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    emit("update-click", {
      ...state,
      description: escapeHtml(state.description).value,
    });
  }
};

const onChipsUpdate = (chips: string[]) => {
  state.tags = chips
}
</script>

<style scoped>
.card-container :deep(.p-card-content) {
  padding: 0;
}
.card-container :deep(.p-chips-multiple-container) {
  width: 100%;
}
</style>