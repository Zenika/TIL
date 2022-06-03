<template>
  <div v-if="post" class="card-container">
    <Card class="p-0">
      <template #content>
        <div class="grid">
          <div
            class="
              col-11
              flex flex-column
              justify-content-center
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
                :href="post.post_by_pk.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{
                  post.post_by_pk.get_title.title
                    ? post.post_by_pk.get_title.title
                    : post.post_by_pk.url
                }}
              </a>
            </h3>
            <small class="font-light">
              {{ post.post_by_pk.user.username }} -
              {{
                new Date(
                  post.post_by_pk.created_at.replace(" ", "T")
                ).toLocaleDateString()
              }}
            </small>
            <div class="flex align-items-center mt-2 mb-1">
              <BookmarkButton
                :bookmarked="post.post_by_pk.bookmarks.length !== 0"
                :uuid="post.post_by_pk.uuid"
              />
              <TagWrapper
                v-for="tags in post.post_by_pk.post_tags"
                :key="tags.id"
                class="ml-2"
                :value="tags.tag.name"
              />
            </div>
          </div>
          <div class="col">
            <img
              :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
            />
          </div>

          <div class="col-12 border-top-1 border-200">
            <p
              class="pt-0 pb-0 overflow-auto text-justify"
              v-html="
                post.post_by_pk.description
                  ? post.post_by_pk.description
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
  <Message v-else class="mt-5" severity="error"> Internal error </Message>
</template>

<script setup>
import { toRefs } from "@vue/reactivity";
import CommentSection from "../components/CommentSection.vue";
import TagWrapper from "@/components/wrappers/TagWrapper.vue";
import BookmarkButton from "@/components/BookmarkButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  post: Object,
});

const { post } = toRefs(props);

let domainName;
if (post.value) domainName = new URL(post.value.post_by_pk.url).hostname;
</script>

<style scoped>
img {
  width: 50px;
}

.card-container :deep(.p-card-content) {
  padding: 0;
}
</style>