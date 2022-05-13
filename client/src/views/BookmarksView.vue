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
      <span
        >{{ result.bookmark_aggregate.aggregate.count }} bookmark{{
          result.bookmark_aggregate.aggregate.count !== 1 ? "s" : ""
        }}</span
      >
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

<script setup>
import NavBar from "@/components/NavBar.vue";
import { useQuery } from "@vue/apollo-composable";
import router from "../router";
import { useRoute } from "vue-router";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import { ref } from "@vue/reactivity";

const route = useRoute();
const rowsPerPage = 10;

if (isNaN(route.query.p) || route.query.p < 1) {
  router.push(`/bookmarks?p=1`);
}

const variables = ref({
  limit: rowsPerPage,
  offset: (route.query.p - 1) * rowsPerPage,
});

const { result, loading, error } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      bookmark_aggregate {
        aggregate {
          count
        }
      }
      bookmark(order_by: {post: {created_at: asc}}, limit: $limit, offset: $offset) {
        post {
          url
          uuid
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
          bookmarks {
            id
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

const changePage = ({ page }) => {
  router.push(`/tags/${route.params.tag}?p=${page + 1}`);
};
</script>

<style scoped>
</style>