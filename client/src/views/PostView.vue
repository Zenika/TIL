<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" severity="error">Internal error</Message>
  <div v-else-if="result" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <a
        :href="result.post_by_pk.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ result.post_by_pk.get_title.title }}
      </a>
    </div>
    <div class="col-4 flex justify-content-center mt-2"></div>
    <div class="col-4 flex justify-content-center mt-2">
      <img
        :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
      />
    </div>
    <div class="col-4 flex justify-content-center mt-2"></div>
    <div class="col-4 col-offset-4 flex justify-content-center mt-2">
      <span>Posted by: {{ result.post_by_pk.user.username }}</span>
    </div>
    <div class="col-12 flex justify-content-center mt-2">
      <CommentSection :postId="route.params.id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CommentSection from "../components/CommentSection.vue";
import NavBar from "@/components/NavBar.vue";
import { ref, watch } from "@vue/runtime-core";

const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($id: Int!) {
      post_by_pk(id: $id) {
        comments {
          username
        }
        get_title {
          title
        }
        url
        user {
          username
        }
      }
    }
  `,
  {
    id: route.params.id,
  }
);

const domainName = ref(null);

watch(result, (resultValue) => {
  if (resultValue)
    domainName.value = new URL(resultValue.post_by_pk.url).hostname;
});
</script>

<style scoped>
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

img {
  width: 50px;
}
</style>