<template>
  <div class="
      flex flex-column
      sm:flex-row
      align-items-center
      col-12
      py-2
      px-3
      sm:p-3
      hover:surface-100
      cursor-hover
    " @click="openArticle(post.uuid)">
    <img class="mb-2 sm:mb-0 sm:mr-3" :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
      :alt="domainName" />
    <div class="
        flex flex-column
        w-full
        justify-content-center
        text-center
        sm:text-left
        overflow-hidden
      ">
      <p class="m-0 overflow-hidden text-overflow-ellipsis white-space-nowrap">
        <a :href="post.url" target="_blank" rel="noopener noreferrer" @click.stop="" class="no-underline">
          {{ post.title ? post.title : post.url }}
        </a>
      </p>
      <span class="created-at text-xs my-1">
        <UserLink :username="post.user.username" :id="post.user.id" class="font-semibold"/> posted on
        {{ new Date(post.created_at.replace(" ", "T")).toLocaleDateString() }}
      </span>
      <p v-if="post.description && post.description.length !== 0" class="description text-sm my-1">
        <span v-html="nlToBr(post.description).value"></span>
      </p>

      <div class="
          flex flex-column
          mt-1
          justify-content-center
          sm:align-items-center sm:flex-row sm:justify-content-start
          text-sm
        ">
        <div class="flex align-items-center justify-content-center">
          <span class="pr-2 border-right-1">
            <i class="pi pi-comments" />
            {{ post.comments_aggregate.aggregate.count }}
          </span>
          <BookmarkButton class="ml-2 mr-2" :bookmarked="post.bookmarks.length !== 0" :uuid="post.uuid" />
        </div>
        <span class="mt-2 sm:mt-0">
          <TagWrapper class="mr-1 mt-1 sm:mt-0" v-for="tags in post.post_tags" :key="tags.uuid" :value="tags.tag.name" />
        </span>
      </div>
    </div>
    <PostOptionButton v-if="post.user.id === user.sub" :postId="post.uuid"
      @delete-click="emit('delete-click', post.uuid)" />
  </div>
</template>

<script setup lang="ts">
import TagWrapper from "@/components/tag/TagWrapper.vue";
import BookmarkButton from "@/components/bookmark/BookmarkButton.vue";
import PostOptionButton from "@/components/post/PostOptionButton.vue";
import UserLink from "@/components/UserLink.vue";
import { nlToBr } from "@/filters/nlToBrFilter";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";
import { Post } from "@/models/post";

const emit = defineEmits(["delete-click"]);

const router = useRouter();

const { user } = useAuth0();

const props = defineProps<{
  post: Post
}>()

const domainName = new URL(props.post.url).hostname;
const openArticle = (id: string) => {
  router.push(`/post/${id}`);
};
</script>

<style lang="scss" scoped>
img {
  width: 50px;
}

.created-at {
  font-weight: lighter;
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.description :deep(p) {
  margin: 0;
}

.description :deep(pre) {
  margin: 0;
}

.description :deep(ol) {
  padding: 0;
  margin: 0;
}

.description :deep(ul) {
  padding: 0;
  margin: 0;
}
</style>