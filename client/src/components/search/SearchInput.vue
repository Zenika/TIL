<template>
  <AutoComplete v-model="selectedTag" :suggestions="suggestions" @complete="onComplete($event)" field="name"
    @item-select="$router.push(`/tags/${encodeURIComponent($event.value.name)}?p=1`)" class="mr-2" placeholder="Search for tags">
    <template #item="slotProps">
      <div>
        {{ slotProps.item.name }} <small>({{ slotProps.item.post_tags_aggregate.aggregate.count }})</small>
      </div>
    </template>
  </AutoComplete>
</template>

<script setup lang="ts">
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useSearchAutoComplete } from '@/composables/useSearchAutoComplete'
import { AutoCompleteItemSelectEvent } from 'primevue/autocomplete';

const { onResult, suggestions, onComplete } = useSearchAutoComplete(gql`
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
)

const router = useRouter();

const selectedTag = ref();

onResult(({ data: { search_tags } }) => {
  suggestions.value = search_tags
})

const onItemSelect = (event: AutoCompleteItemSelectEvent) => {
  const { name } = event.value;
  router.push(`/tags/${encodeURIComponent(name)}`);
}
</script>