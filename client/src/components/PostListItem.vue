<template>
  <div class="col-12">
    <div class="post-list-item">
      <img
        :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
        :alt="post.content"
      />
      <div class="post-detail">
        <div class="product-name">
          <a
            :href="post.url"
            target="_blank"
            rel="noopener noreferrer"
            v-html="post.get_title.title ? post.get_title.title : post.url"
          ></a>
        </div>
        <div>
          <div class="flex align-items-center">
            <span class="description">
              <b>{{ post.user.username }}</b> posted on
              {{
                new Date(post.created_at.replace(" ", "T")).toLocaleDateString()
              }}
            </span>
          </div>
        </div>
        <div class="flex align-items-center">
          <Button
            class="p-button-outlined p-button-secondary p-button-sm"
            icon="pi pi-comments"
            :label="`${post.comments_aggregate.aggregate.count} Comment${
              post.comments_aggregate.aggregate.count !== 1 ? 's' : ''
            }`"
            @click="openArticle(post.uuid)"
          />
          <TagWrapper
            class="ml-2"
            v-for="tags in post.post_tags"
            :key="tags.id"
            :value="tags.tag.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TagWrapper from '@/components/wrappers/TagWrapper.vue'
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
:deep(.post-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    margin-right: 2rem;
  }

  .post-detail {
    flex: 1 1 0;
  }

  .description {
    font-size: 0.9rem;
    font-weight: lighter;
    margin: 5px 0 5px 0;
  }
}
@media screen and (max-width: 576px) {
  .post-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 0.5rem 0;
    }

    .post-detail {
      text-align: center;
    }
  }
}
</style>