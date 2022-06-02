<template>
  <div class="flex flex-column sm:flex-row align-items-center col-12 p-3">
    <img
      class="mb-3 sm:mr-3"
      :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
      :alt="post.content"
    />
    <div
      class="
        flex flex-column
        w-full
        justify-content-center
        text-align-center text-center
        overflow-hidden
        sm:text-left
      "
    >
      <a
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        class="overflow-hidden text-overflow-ellipsis white-space-nowrap"
      >
        {{ post.get_title.title ? post.get_title.title : post.url }}
      </a>
      <span class="created-at text-sm my-1">
        <b>{{ post.user.username }}</b> posted on
        {{ new Date(post.created_at.replace(" ", "T")).toLocaleDateString() }}
      </span>
      <div
        class="
          flex flex-column
          justify-content-center
          sm:align-items-center
          sm:flex-row sm:justify-content-start
        "
      >
        <div class="flex align-items-center justify-content-center">
          <Button
            class="p-button-outlined p-button-secondary p-button-sm"
            icon="pi pi-comments"
            :label="`${post.comments_aggregate.aggregate.count} Comment${
              post.comments_aggregate.aggregate.count !== 1 ? 's' : ''
            }`"
            @click="openArticle(post.uuid)"
          />
          <BookmarkButton
            class="ml-2"
            :bookmarked="post.bookmarks.length !== 0"
            :uuid="post.uuid"
          />
        </div>
        <span class="mt-2 sm:mt-0">
          <TagWrapper
            class="mx-1 sm:ml-2 sm:mr-0"
            v-for="tags in post.post_tags"
            :key="tags.id"
            :value="tags.tag.name"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import TagWrapper from "@/components/wrappers/TagWrapper.vue";
import BookmarkButton from "@/components/BookmarkButton.vue";
import router from "@/router";

const props = defineProps({
  post: Object,
});

const domainName = new URL(props.post.url).hostname;
const openArticle = (id) => {
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
</style>