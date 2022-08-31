<template>
    <AutoComplete :multiple="true" v-model="selectedTags" :suggestions="suggestions" @complete="onComplete($event)"
        field="name" @item-select="onItemSelect($event)" @item-unselect="onItemUnselect($event)" inputClass="w-full"
        class="w-full autocomplete">
        <template #item="slotProps">
            <div>
                {{ slotProps.item.name }} <small>({{ slotProps.item.post_tags_aggregate.aggregate.count }})</small>
            </div>
        </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import { useSearchAutoComplete } from '@/composables/useSearchAutoComplete';
import { Tag } from '@/models/tag';
import gql from 'graphql-tag';
import { AutoCompleteItemSelectEvent, AutoCompleteItemUnselectEvent } from 'primevue/autocomplete';
import { ref, toRef } from 'vue';

const { onResult, suggestions, onComplete, lastSearchedText } = useSearchAutoComplete(gql`
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

const emit = defineEmits(["update"])

const props = defineProps<{
  tags?: Tag[]
}>()

const selectedTags = ref(toRef(props, "tags").value);

let filteredTags = selectedTags.value?.map(tag => tag.name);

onResult(({ data: { search_tags } }) => {
    suggestions.value = search_tags

    if (!suggestions.value.find((tag: Tag) => tag.name === lastSearchedText.value)) {
        suggestions.value = [
            {
                name: lastSearchedText.value,
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

const onItemSelect = (event: AutoCompleteItemSelectEvent) => {
    const { name } = event.value;
    if (selectedTags.value!.length > 5)
        return selectedTags.value!.pop()
    filteredTags?.push(name)
    emit("update", filteredTags)
}

const onItemUnselect = (event: AutoCompleteItemUnselectEvent) => {
    const { name } = event.value;
    filteredTags = filteredTags?.filter(tag => tag !== name);
    emit("update", filteredTags)
}
</script>

<style scoped>
.autocomplete :deep(ul) {
    width: 100%;
}
</style>