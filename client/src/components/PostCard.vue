<template>
  <div v-if="post" class="card-container">
    <Card class="p-0">
      <template #content>
        <div class="grid">
          <div class="col flex align-items-center mb-2">
            <img
              :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
            />
          </div>
          <div class="col-10 flex flex-column justify-content-center mb-2">
            <h3
              class="
                font-normal
                m-0
                overflow-hidden
                text-overflow-ellipsis
                white-space-nowrap
              "
            >
              <a :href="post.url" target="_blank" rel="noopener noreferrer">
                {{ post.get_title.title ? post.get_title.title : post.url }}
              </a>
            </h3>
            <small class="font-light">
              {{ post.user.username }} -
              {{
                new Date(post.created_at.replace(" ", "T")).toLocaleDateString()
              }}
            </small>
            <div class="flex align-items-center mt-2 mb-1">
              <BookmarkButton
                :bookmarked="post.bookmarks.length !== 0"
                :uuid="post.uuid"
              />
              <TagWrapper
                v-for="tags in post.post_tags"
                :key="tags.id"
                class="ml-2"
                :value="tags.tag.name"
              />
            </div>
          </div>
          <div class="col flex flex-column align-items-center">
            <div v-if="post.user.id === user.sub">
              <Button
                @click="openMenu"
                class="
                  p-button-secondary p-button-text p-button-sm p-button-rounded
                  mb-2
                "
                icon="pi pi-ellipsis-h"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                data-test="ellipsis"
              />
              <Menu id="overlay_menu" ref="menu" :popup="true" :model="items" />
            </div>
          </div>

          <div class="col-12 border-top-1 border-200">
            <p
              class="pt-0 pb-0 overflow-auto text-justify"
              v-html="
                post.description
                  ? nlToBr(post.description).value
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
import { ref, toRefs } from "@vue/reactivity";
import CommentSection from "../components/CommentSection.vue";
import TagWrapper from "@/components/wrappers/TagWrapper.vue";
import BookmarkButton from "@/components/BookmarkButton.vue";
import { useRoute, useRouter } from "vue-router";
import { nlToBr } from "@/filters/nlToBrFilter";
import { useAuth0 } from "@auth0/auth0-vue";

const emit = defineEmits(["delete-click"]);

const { user } = useAuth0();

const route = useRoute();
const router = useRouter();

const props = defineProps({
  post: Object,
});

const { post } = toRefs(props);

const menu = ref();
const items = ref([
  {
    label: "Edit",
    icon: "pi pi-pencil",
    command: () => router.push(`/post/${route.params.id}/edit`),
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => emit("delete-click"),
  },
]);

let domainName;
if (post.value) domainName = new URL(post.value.url).hostname;

const openMenu = (event) => {
  menu.value.toggle(event);
};

</script>

<style scoped>
img {
  width: 50px;
}

.card-container :deep(.p-card-content) {
  padding: 0;
}
</style>