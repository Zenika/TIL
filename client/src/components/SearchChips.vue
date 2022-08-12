<template>
    <AutoComplete :multiple="true" v-model="selectedTags" :suggestions="suggestions" @complete="searchTags($event)"
        field="name" @item-select="onItemSelect($event)" @item-unselect="onItemUnselect($event)" inputClass="w-full"
        class="w-full autocomplete">
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
import { ref, toRef } from 'vue';

const emit = defineEmits(["update"])

let props = defineProps({
  tags: {
    type: Array,
    default() {
      return [];
    }
  },
});

const suggestions = ref([]);
const selectedTags = ref(toRef(props, "tags").value);

let filteredTags = selectedTags.value.map(tag => tag.name);
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

    if (!suggestions.value.find(tag => tag.name === lastSearchedText)) {
        suggestions.value = [
            {
                name: lastSearchedText,
                post_tags_aggregate: {
                    aggregate: {
                        count: "new tag"
                    }
                }
            },
            ...suggestions.value,
        ]
    }
})

const onItemSelect = ({ value: { name } }) => {
    if (selectedTags.value.length > 5)
        return selectedTags.value.pop()
    filteredTags.push(name)
    emit("update", filteredTags)
}

const onItemUnselect = ({ value: { name } }) => {
    filteredTags = filteredTags.filter(tag => tag !== name);
    emit("update", filteredTags)
}
</script>

<style scoped>
.autocomplete :deep(ul) {
    width: 100%;
}
</style>