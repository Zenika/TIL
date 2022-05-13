<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" severity="error">Internal error</Message>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <PostListItem :post="slotProps.data" @bookmark="onBookmark" />
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
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ref, watch } from "@vue/runtime-core";
import NavBar from "@/components/NavBar.vue";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import router from "../router";
import { useRoute } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const { user } = useAuth0();

const route = useRoute();
const rowsPerPage = 10;

if (isNaN(route.query.p) || route.query.p < 1) {
  router.push(`/?p=1`);
}

const variables = ref({
  limit: rowsPerPage,
  offset: (route.query.p - 1) * rowsPerPage,
});

const { result, loading, error } = useQuery(
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
  router.push(`/?p=${page + 1}`);
};

const { mutate: insertBookmark } = useMutation(
  gql`
    mutation InsertBookmark($post_uuid: uuid!, $user_id: String!) {
      insert_bookmark_one(
        object: { post_uuid: $post_uuid, user_id: $user_id }
      ) {
        id
      }
    }
  `
);

const { mutate: deleteBookmark } = useMutation(
  gql`
    mutation DeleteBookmark($post_uuid: uuid!, $user_id: String!) {
      delete_bookmark(
        where: { post_uuid: { _eq: $post_uuid }, user_id: { _eq: $user_id } }
      ) {
        affected_rows
      }
    }
  `
);

const onBookmark = async ({ uuid, state }) => {
  const params = { post_uuid: uuid, user_id: user.value.sub };
  state ? insertBookmark(params) : deleteBookmark(params);
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