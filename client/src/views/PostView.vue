<template>
  <div v-if="loading" class="grid">
    <div class="col-12 flex justify-content-center mt-6">
      <ProgressSpinner />
    </div>
  </div>
  <p v-else-if="error">{{ error }}</p>
  <div v-else-if="result" class="grid ">
    <div class="col-12 flex justify-content-center mt-6 article-background-color">
      <h1>{{ result.post_by_pk.get_title.title }}</h1>
    </div>
    <div class="col-4 flex justify-content-center mt-4"></div>
    <div class="col-4 flex justify-content-center mt-4 article-background-color">
      <img
        :src="`https://www.google.com/s2/favicons?sz=256&domain_url=${domainName}`"
      
      />
    </div>
    <div class="col-4 flex justify-content-center mt-4"></div>
    <div class="col-4 col-offset-4 flex justify-content-center mt-2 article-background-color">
      <p>Written by: {{ result.post_by_pk.user.username }}</p>
    </div>
    <div class="col-12 flex justify-content-center mt-2">
      <CommentSection :postId="route.params.id" />
  
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CommentSection from "../components/CommentSection.vue";
import { ref, watch } from "@vue/runtime-core";


const route = useRoute();

const { loading, result, error } = useQuery(
  gql`
    query getPost($id: Int!) {
      post_by_pk(id: $id) {
      comments {
        username
      }
      get_title {
      title
       }  
      url 
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
watch(result,(resultValue)=>{
if(resultValue)
domainName.value = new URL(resultValue.post_by_pk.url).hostname;
}) 
</script>

<style scoped>
.article-background-color {
  background-color: #f8f9fa;
}

</style>