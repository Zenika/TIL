<template>
  <NavBar />
  <ProgressSpinner v-if="loading" class="spinner" />
  <Message v-else-if="error" class="mt-5" severity="error">
    Internal error
  </Message>
  <div v-else-if="result" class="grid m-0 mt-2">
    <div class="col-6 col-offset-3">
      <Button
        label="Return"
        class="p-button-plain p-button-text"
        icon="pi pi-angle-left"
        @click="$router.go(-1)"
      />
    </div>
    <div class="col-6 col-offset-3 card-container">
      <Card class="p-0">
        <template #content>
          <div class="grid">
            <div
              class="
                col-11
                flex flex-column
                justify-content-center
                overflow-hidden
              "
            >
              <h3
                class="
                  font-normal
                  m-0
                  overflow-hidden
                  text-overflow-ellipsis
                  white-space-nowrap
                "
              >
                <a
                  :href="result.post_by_pk.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{
                    result.post_by_pk.get_title.title
                      ? result.post_by_pk.get_title.title
                      : result.post_by_pk.url
                  }}
                </a>
              </h3>
              <small class="font-light">
                {{ result.post_by_pk.user.username }} -
                {{
                  new Date(
                    result.post_by_pk.created_at.replace(" ", "T")
                  ).toLocaleDateString()
                }}
              </small>
            </div>
            <div class="col">
              <img
                :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
              />
            </div>

            <div class="col-12 border-top-1 border-200">
              <p
                class="pt-0 pb-0"
                v-html="
                  result.post_by_pk.description
                    ? result.post_by_pk.description
                    : '<i>No description</i>'
                "
              />
            </div>

            <div class="col-12">
              <CommentSection :postId="route.params.id" />
            </div>
          </div>
        </template>
      </Card>
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
        url
        description
        created_at
        comments {
          username
        }
        get_title {
          title
        }
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

.card-container >>> .p-card-content {
  padding: 0;
}

img {
  width: 50px;
}
</style>