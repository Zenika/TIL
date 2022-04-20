<template>
  <div class="container">
    <ProgressSpinner v-if="loading" />
    <code v-else-if="error">{{ error }}</code>
    <div v-else-if="result.post">
      <div class="A">
        <DataView :value="result.post" :layout="'list'" >
          <template #list="slotProps">
            <PostListItem :post="slotProps.data" />
          </template>
          <template #empty>
            <div>No articles found.</div>
          </template>
        </DataView>
      </div>
    </div>
    <Paginator
      :first="offset"
      :totalRecords="totalRecords"
      :rows="10"   
      @page="changePage($event)"  
      data-test="pagination"
    >
   </Paginator>
    </div>

</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { reactive, ref } from "@vue/reactivity";

import { onMounted, watch } from "@vue/runtime-core";
import gql from "graphql-tag";
import PostListItem from "../components/PostListItem.vue";
import router from "../router";
import { useRoute } from "vue-router";


const route = useRoute();
const { result:total } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {
      post_aggregate {
        aggregate {
          count
        }
      }
 
    }
  `,

);

let totalRecords = ref(null);
let currentPage = ref(route.params.page);
if(currentPage== null)
currentPage=1;
watch(total, (resultValue) => {
  if (resultValue){ totalRecords.value = resultValue.post_aggregate.aggregate.count;
      let nPages = Math.ceil(totalRecords.value / 10)  
  if(currentPage.value>nPages){
    currentPage.value = 1;
    variables.value = {
    limit: 10,
    offset: 0}
    
   router.push(`/${1}`)
}

}
});

if(isNaN(currentPage.value)){
    currentPage.value =1;
    router.push(`${1}`)
}

const variables = ref({
  limit: 10,
  offset: 10 * currentPage.value - 10,
  
});
const { result, loading, error, refetch } = useQuery(
  gql`
    query getPosts($limit: Int, $offset: Int) {

      post(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
        url
        created_at
        get_title {
          error
          title
        }
      }
    }
  `,
  variables
);



function changePage(e) {
  variables.value = {
    limit: 10,
    offset: e.page * 10,

  };
  router.push(`/${e.page + 1}`)
}
let currentOffset = variables.value.limit * currentPage.value - 10;
  let offset = ref(currentOffset);
 




</script>

<style scoped>
.container {
  height: 100%;
}

.A {
  height: 94%;
  overflow: scroll;
  background-color: blue;
}

.B {
  height: 6%;
  background-color: green;
}
</style>