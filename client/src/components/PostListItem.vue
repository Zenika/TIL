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
        <p>
          {{ post.user.username }}
        </p>
        <p class="date">
          {{
            new Date(post.created_at.replace(" ", "T")).toLocaleDateString()
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});

const domainName = new URL(props.post.url).hostname;
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

  p {
    margin: 0;
  }

  .date {
    font-size: 0.8rem;
    font-weight: lighter;
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