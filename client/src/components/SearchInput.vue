<template>
  <span class="p-input-icon-left mr-2">
    <i class="pi pi-search" />
    <InputText type="text" v-model="text" placeholder="Search" @input="enableFetch = true" />
  </span>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { computed } from '@vue/reactivity';
import gql from 'graphql-tag';
import { ref, watch } from 'vue';

const text = ref("");
const enableFetch = ref(false)

const { result, loading } = useQuery(gql`
  query MyQuery($text: String!) {
    search_tag(text: $text)
  }`,
  { text },
  { enabled: computed(() => enableFetch.value) }
);

watch(result, newRes => {
  console.log(newRes)
})
</script>