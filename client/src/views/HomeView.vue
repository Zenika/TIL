<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" severity="error">Internal error</Message>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <PostListItem
          :post="slotProps.data"
          @delete-click="deletePost($event)"
        />
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
        description
        get_title {
          error
          title
        }
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

const mutation = gql`
  mutation DeletePost($uuid: uuid!) {
    delete_comment(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_tag(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_bookmark(where: { post_uuid: { _eq: $uuid } }) {
      affected_rows
    }
    delete_post_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

const { mutate, onDone } = useMutation(mutation);

onDone(() => router.push(`/`));

const deletePost = (uuid) => {
  mutate({ uuid });
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