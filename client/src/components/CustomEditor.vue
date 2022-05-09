<template>
  <Editor
    :value="modelValue"
    :editorStyle="editorStyle"
    @text-change="updateValue"
  >
    <template #toolbar>
      <span class="ql-formats">
        <select class="ql-header" defaultValue="0">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="0">Normal</option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold" type="button"></button>
        <button class="ql-italic" type="button"></button>
        <button class="ql-underline" type="button"></button>
        <button class="ql-strike" type="button"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered" type="button"></button>
        <button class="ql-list" value="bullet" type="button"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-link" type="button"></button>
        <button class="ql-code-block" type="button"></button>
      </span>
    </template>
  </Editor>
</template>

<script setup>
const props = defineProps({
  editorStyle: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.htmlValue);
};
</script>