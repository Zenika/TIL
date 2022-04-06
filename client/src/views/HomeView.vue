<template>
  <ProgressSpinner v-if="loading" />
  <code v-else-if="error">{{ error }}</code>
  <div v-else-if="result.post">
    <DataView :value="result.post" :layout="'list'">
      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              :alt="slotProps.data.content"
            />
            <div class="product-list-detail">
              <div class="product-name">
                <a :href="slotProps.data.content" target="_blank" rel="noopener noreferrer">{{slotProps.data.content}}</a>
              </div>
              {{new Date(slotProps.data.created_at.replace(' ', 'T')).toDateString()}}
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result, loading, error } = useSubscription(gql`
  subscription getPosts {
    post(order_by: {created_at: desc}) {
      content
      created_at
    }
  }
`);
</script>

<style lang="scss" scoped>
.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

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