<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" severity="error">Internal error</Message>
  <div v-else-if="result.post">
    <div class="grid m-0">
      <div class="xl:col-3"/>
      <div class="p-0 md:p-2 col-12 md:col-9 xl:col-6">
        <div class="flex flex-column border-right-1 border-left-1 border-bottom-1 border-300">
          <PostList :posts="result.post" @on-refresh="refetch" />
          <Paginator :first="variables.offset" :totalRecords="result.post_aggregate.aggregate.count" :rows="rowsPerPage"
            @page="changePage($event)" />
        </div>
      </div>
      <div class="hidden md:block md:col-3">
        <TagListCard :tags="result.tag" class="" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "@vue/runtime-core";
import NavBar from "@/components/NavBar.vue";
import gql from "graphql-tag";
import PostList from "@/components/post/PostList.vue";
import router from "../router";
import { useRoute } from "vue-router";
import TagListCard from "@/components/tag/TagListCard.vue";

const route = useRoute();
const currentPage = parseInt(route.query.p?.[0]!)
const rowsPerPage = 10;

if (isNaN(currentPage) || currentPage < 1) {
  router.push(`/?p=1`);
}

const variables = ref({
  limit: rowsPerPage,
  offset: (currentPage - 1) * rowsPerPage,
});

const { result, loading, error, refetch } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      post_aggregate {
        aggregate {
          count
        }
      }
      post(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
        url
        uuid
        created_at
        description
        title
        user {
          id
          username
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
        post_tags(order_by: { tag: { name: asc } }) {
          tag {
            name
          }
        }
        bookmarks {
          uuid
        }
      }
      tag(order_by: {post_tags_aggregate: {count: desc}}) {
        name
        post_tags_aggregate {
          aggregate {
            count
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
    Math.ceil(value.post_aggregate.aggregate.count / rowsPerPage)
  ) {
    router.push({ params: { p: 1 } });
  }
});

const changePage = ({ page }: { page: number }) => {
  router.push(`/?p=${page + 1}`);
};
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