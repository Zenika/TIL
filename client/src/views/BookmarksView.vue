<template>
  <NavBar />
  <div class="grid m-0">
    <div class="col-12 mb-0 flex justify-content-center">
      <h1 class="font-light mb-0 mt-0">Bookmarks</h1>
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
      <span>
        {{ result.bookmark_aggregate.aggregate.count }} bookmark{{
          result.bookmark_aggregate.aggregate.count !== 1 ? "s" : ""
        }}
      </span>
    </div>
    <DataView :value="result.bookmark" :layout="'list'">
      <template #list="slotProps">
        <PostListItem :post="slotProps.data.post" />
      </template>
      <template #empty>
        <div>No articles found.</div>
      </template>
    </DataView>
  </div>
  <Paginator
    v-if="result"
    :first="variables.offset"
    :totalRecords="result.bookmark_aggregate.aggregate.count"
    :rows="rowsPerPage"
    @page="changePage($event)"
  />
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useQuery } from "@vue/apollo-composable";
import router from "../router";
import { LocationQueryValue, useRoute } from "vue-router";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

const route = useRoute();
const currentPage = parseInt(route.query.p?.[0]!)
const rowsPerPage = 10;

if (isNaN(currentPage) || currentPage < 1) {
  router.push(`/bookmarks?p=1`);
}

const variables = ref({
  limit: rowsPerPage,
  offset: (currentPage - 1) * rowsPerPage,
});

const { result, loading, error } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      bookmark_aggregate {
        aggregate {
          count
        }
      }
      bookmark(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
        post {
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
          post_tags(order_by: {tag: {name: asc}}) {
            tag {
              name
            }
          }
          bookmarks {
            uuid
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

watch(result, (value) => {
  if (
    value &&
    currentPage >
      Math.ceil(value.bookmark_aggregate.aggregate.count / rowsPerPage)
  ) {
    router.push(`/bookmarks?p=1`);
  }
});

const changePage = ({ page }: {page: number}) => {
  router.push(`/bookmarks?p=${page + 1}`);
};
</script>

<style scoped>
</style>