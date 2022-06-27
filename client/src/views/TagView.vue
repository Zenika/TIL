<template>
  <NavBar />
  <div class="grid m-0">
    <div class="col-12 mb-0 flex justify-content-center">
      <h1 class="font-light mb-0 mt-0">
        Posts tagged <span class="font-bold">{{ route.params.tag }}</span>
      </h1>
    </div>
  </div>
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" class="mt-5" severity="error">
    Internal error
  </Message>
  <div v-else-if="result">
    <div
      class="
        col-12
        mb-0
        flex
        justify-content-center
        border-bottom-1 border-200
        pt-0
        pb-10
      "
    >
      <span
        >{{ result.post_aggregate.aggregate.count }} post{{
          result.post_aggregate.aggregate.count !== 1 ? "s" : ""
        }}</span
      >
    </div>

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
    :totalRecords="result.post_aggregate.aggregate.count"
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

if (isNaN(route.query.p) || route.query.p < 1) {
  router.push(`/tags/${route.params.tag}?p=1`);
}

const variables = ref({
  tag: route.params.tag,
  limit: rowsPerPage,
  offset: (route.query.p - 1) * rowsPerPage,
});

const { loading, result, error } = useQuery(
  gql`
    query getPostsByTag($tag: String!, $limit: Int!, $offset: Int!) {
      post_aggregate(where: { post_tags: { tag: { name: { _eq: $tag } } } }) {
        aggregate {
          count
        }
      }
      post(
        order_by: { created_at: desc }
        where: { post_tags: { tag: { name: { _eq: $tag } } } }
        limit: $limit
        offset: $offset
      ) {
        url
        uuid
        created_at
        description
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
        bookmarks {
          id
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

watch(result, (value) => {
  if (
    value &&
    route.query.p >
      Math.ceil(value.post_aggregate.aggregate.count / rowsPerPage)
  ) {
    router.push({ params: { p: 1 } });
  }
});

const changePage = ({ page }) => {
  router.push(`/tags/${route.params.tag}?p=${page + 1}`);
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