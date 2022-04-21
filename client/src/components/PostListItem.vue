<template>
  <div class="col-10">
    <div class="post-list-item ">
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
          <div class="date-comment">
         <div class="date-username">   
        <p >
          {{ post.user.username }}
        </p> 
     
     
             <p class="date">
          {{
            new Date(post.created_at.replace(" ", "T")).toLocaleDateString()
          }}
         </p>
         </div>
          
           <img @click="openArticle(post.id)"  class="col-2 comment" height="37"   src="../assets/chat-left-text.svg" />
       </div>
         </div>  
      </div>
    

  </div>
</template>

<script setup>
const { default: router }=require("@/router");

const props = defineProps({
  post: Object,
});

const domainName = new URL(props.post.url).hostname;
const openArticle = (id)=>{
  router.push(`/post/${id}`)
}
</script>

<style lang="scss" scoped>
.date-username {grid-row: 1;grid-column: 1/3;}
.comment {grid-row: 1; grid-column: 2/3;
margin-top: 2px;}
:hover.comment {
  background-color: #f8f9fa;
  cursor: pointer;
}
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
  .date-comment {
    display: grid;
    grid-template-areas: repeat(1, 1fr);
    grid-template-columns: minmax(80px, auto) 1fr 1fr 1fr 1fr 1fr ;
    grid-template-rows: minmax(20px, auto);
    margin-top: 3px;
    
    
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