<template>
  <span class="p-input-icon-left mr-2">
    <i class="pi pi-search" />
    <InputText type="text" v-model="text" placeholder="Search for tags" @input="onInput($event)"
      @focusout="onFocusOut($event)" />
  </span>
  <Menu id="overlay_menu" ref="menu" :popup="true" :model="menuItems" />
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { computed } from '@vue/reactivity';
import gql from 'graphql-tag';
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const text = ref("");
const menu = ref();
const menuItems = ref([])
const enableFetch = ref(false)

const { result, loading } = useQuery(gql`
  query MyQuery($search: String!) {
    search_tags(args: {search: $search}) {
      name
      post_tags_aggregate {
        aggregate {
          count
        }
      }
    }
  }`,
  { search: text },
  { enabled: computed(() => enableFetch.value) }
);

const onFocusOut = (event) => {
  menu.value.hide(event)
}

const onInput = (event) => {
  enableFetch.value = true
  if (text.value.length > 1 && menuItems.value.length > 0)
    menu.value.show(event)
}

watch(result, resValue => {
  menuItems.value = resValue.search_tags.map((tag) => ({
    label: `${tag.name} (${tag.post_tags_aggregate.aggregate.count})`,
    command: () => {
      router.push(`/tags/${tag.name}`);
    },
  }))
  if (menuItems.value.length === 0)
    menu.value.hide()
})
</script>