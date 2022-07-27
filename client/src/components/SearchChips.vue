<template>
    <AutoComplete :multiple="true" v-model="selectedTags" :suggestions="suggestions" @complete="searchTags($event)"
        field="name" @item-select="onItemSelect($event)" @item-unselect="onItemUnselect($event)" inputClass="w-full"
        class="w-full autocomplete">
        <template #item="slotProps">
            <div class="country-item">
                <div>
                    {{ slotProps.item.name }} <small>({{ slotProps.item.post_tags_aggregate.aggregate.count }})</small>
                </div>
            </div>
        </template>
    </AutoComplete>
</template>

<script setup>
import { useLazyQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';

const emit = defineEmits(["update"])

let lastSearchedText = "";
let filteredTags = [];
const selectedTags = ref([]);
const suggestions = ref([]);

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