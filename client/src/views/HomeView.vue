<template>
  <NewPostInput @posted="refetch" />
  <ProgressSpinner v-if="loading" class="spinner" />
  <code v-else-if="error">{{ error }}</code>
  <div v-else-if="result.post">
    <div class="A">
      <DataView :value="result.post" :layout="'list'">
        <template #list="slotProps">
          <PostListItem :post="slotProps.data" />
        </template>
        <template #empty>
          <div>No articles found.</div>
        </template>
      </DataView>
    </div>
  </div>
  <Paginator
    :first="offset"
    :totalRecords="totalRecords"
    :rows="10"
    @page="changePage($event)"
    data-test="pagination"
  >
  </Paginator>
</template>

<script setup>
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { ref } from "@vue/reactivity";

import { watch } from "@vue/runtime-core";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import router from "../router";
import { useRoute } from "vue-router";
import NewPostInput from "../components/NewPostInput.vue";

const route = useRoute();
const { result: total } = useSubscription(
  gql`
    subscription getPosts($limit: Int, $offset: Int) {
      post_aggregate {
        aggregate {
          count
        }
      }
    }
  `
);

let totalRecords = ref(null);
let currentPage = ref(route.params.page);
if (currentPage == null) currentPage = 1;

const checkPageNumber = (totalRecords) => {
  let nPages = Math.ceil(totalRecords / 10);
  if (currentPage.value > nPages) {
    currentPage.value = 1;
    variables.value = {
      limit: 10,
      offset: 0,
    };

    router.push(`/${1}`);
  }
};

watch(total, (resultValue) => {
  console.log("ayo")
  if (resultValue) {
    totalRecords.value = resultValue.post_aggregate.aggregate.count;
    checkPageNumber(totalRecords.value)
  }
});

if (isNaN(currentPage.value)) {
  currentPage.value = 1;
  router.push(`${1}`);
}

const variables = ref({
  limit: 10,
  offset: 10 * currentPage.value - 10,
});
const { result, loading, error, refetch } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      post(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
        url
        created_at
        get_title {
          error
          title
        }
        user {
          username
        }
      }
    }
  `,
  variables,
  { notifyOnNetworkStatusChange: true }
);

function changePage(e) {
  variables.value = {
    limit: 10,
    offset: e.page * 10,
  };
  router.push(`/${e.page + 1}`);
}
let currentOffset = variables.value.limit * currentPage.value - 10;
let offset = ref(currentOffset);
</script>

<style scoped>
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>