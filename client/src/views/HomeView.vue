<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" severity="error">Internal error</Message>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <PostListItem :post="slotProps.data" />
      </template>
      <template #empty>
        <div>No articles found.</div>
      </template>
    </DataView>
  </div>
  <Paginator
    :first="offset"
    :totalRecords="aggregateResult?.post_aggregate.aggregate.count"
    :rows="10"
    @page="changePage($event)"
  />
</template>

<script setup>
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { ref } from "@vue/reactivity";
import NavBar from "@/components/NavBar.vue";
import { watch } from "@vue/runtime-core";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import router from "../router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  refetch();
});

const route = useRoute();

const { result: aggregateResult } = useSubscription(
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

let currentPage = route.query.p;

if (isNaN(currentPage)) {
  currentPage = 1;
  router.push(`?p=1`);
}

const checkPageNumber = (totalRecords) => {
  let nPages = Math.ceil(totalRecords / 10);
  if (currentPage > nPages) {
    currentPage = 1;
    getPostsVariables.value = {
      limit: 10,
      offset: 0,
    };

    router.push(`?p=1`);
  }
};

watch(aggregateResult, (value) => {
  checkPageNumber(value.post_aggregate.aggregate.count);
});

const getPostsVariables = ref({
  limit: 10,
  offset: 10 * currentPage - 10,
});
const { result, loading, error, refetch } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      post(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
        url
        id
        created_at
        get_title {
          error
          title
        }
        user {
          username
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
        post_tags {
          tag {
            name
          }
        }
      }
    }
  `,
  getPostsVariables,
  {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  }
);

const changePage = (e) => {
  getPostsVariables.value = {
    limit: 10,
    offset: e.page * 10,
  };
  router.push(`?p=${e.page + 1}`);
};
let offset = ref(getPostsVariables.value.limit * currentPage - 10);
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