<template>
  <div class="col-12">
    <div class="product-list-item">
      <img
        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        :alt="post.content"
      />
      <div class="product-list-detail">
        <div class="product-name">
          <a
            :href="post.url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ post.get_title.title ? post.get_title.title : post.url }}</a
          >
        </div>
        {{
          new Date(post.created_at.replace(" ", "T")).toLocaleDateString()
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
:deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }
  }
}
</style>