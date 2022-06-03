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
            label="Post"
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
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, url } from "@vuelidate/validators";
import { escapeHtml } from "@/filters/escapeHtmlFilter";

defineProps({
  loading: Boolean,
});

const emit = defineEmits(["post-click"]);

const state = reactive({
  url: null,
  description: null,
  tags: [],
});

const rules = {
  url: { required, url },
  description: { maxLength: maxLength(1000) },
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    emit("post-click", {
      ...state,
      description: escapeHtml(state.description).value,
    });
  }
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