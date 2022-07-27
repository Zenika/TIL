<template>
    <AutoComplete v-model="selectedTag" :suggestions="suggestions" @complete="searchTags($event)" field="name"
      @item-select="onItemSelect($event)" class="mr-2" placeholder="Search for tags">
      <template #item="slotProps">
        <div>
          {{ slotProps.item.name }} <small>({{ slotProps.item.post_tags_aggregate.aggregate.count }})</small>
        </div>
      </template>
    </AutoComplete>
</template>

<script setup>
import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const suggestions = ref([]);
const selectedTag = ref();
let lastSearchedText = "";

const { load, onResult } = useLazyQuery(gql`
  query SearchTags($search: String!) {
    search_tags(args: {search: $search}) {
      name
      post_tags_aggregate {
        aggregate {
          count
        }
      }
    }
  }`
);

const searchTags = ({ query }) => {
  if (lastSearchedText === query) {
    suggestions.value = [...suggestions.value]
  } else {
    load(null, { search: query })
    lastSearchedText = query
  }
}

onResult(({ data: { search_tags } }) => {
  suggestions.value = search_tags
})

const onItemSelect = ({ value: { name } }) => {
  router.push(`/tags/${name}`);
}
</script>