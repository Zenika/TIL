<template>
  <NavBar />
  <div class="grid m-0">
    <div
      class="col-12 mb-0 flex justify-content-center border-bottom-1 border-200"
    >
      <h1 class="font-light">
        Posts tagged <span class="font-bold">{{ route.params.tag }}</span>
      </h1>
    </div>
  </div>
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" class="mt-5" severity="error">
    Internal error
  </Message>
  <div v-else-if="result">
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
    v-if="result"
    :first="variables.offset"
    :totalRecords="result?.post_aggregate.aggregate.count"
    :rows="rowsPerPage"
    @page="changePage($event)"
  />
</template>

<script setup>
import { useRoute } from "vue-router";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import NavBar from "@/components/NavBar.vue";
import PostListItem from "../components/PostListItem.vue";
import { ref, watch } from "@vue/runtime-core";
import router from "../router";

const route = useRoute();
const rowsPerPage = 10;

const processPageNb = (pageNb) => {
    if (isNaN(pageNb) || pageNb < 1) {
        router.push(`/tags/${route.params.tag}?p=1`);
        return 1
    }
    return pageNb
}

const getOffset = (pageIndex) => pageIndex * rowsPerPage;

const variables = ref({
  tag: route.params.tag,
  limit: rowsPerPage,
  offset: getOffset(processPageNb(route.query.p) - 1),
});

const { loading, result, error, refetch } = useQuery(
  gql`
    query MyQuery($tag: String!, $limit: Int!, $offset: Int!) {
      post_aggregate(where: { post_tag: { tag: { name: { _eq: $tag } } } }) {
        aggregate {
          count
        }
      }
      post(
        order_by: { created_at: desc }
        where: { post_tag: { tag: { name: { _eq: $tag } } } }
        limit: $limit
        offset: $offset
      ) {
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
  variables,
  {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  }
);

watch(
  () => route.params.tag,
  (tag) => {
    variables.value = {
      ...variables.value,
      tag,
      offset: 0,
    };
  }
);

const changePage = ({ page }) => {
  router.push(`/tags/${route.params.tag}?p=${page + 1}`);
  // refetch();
  variables.value = {
    ...variables.value,
    offset: getOffset(page),
  };
};
</script>

<style scope>
.spinner {
  position: absolute;
  left: 50%;
  top: 35%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>