<template>
    <NavBar />
    <ProgressSpinner v-if="loading" class="spinner" />
    <Message v-else-if="error" severity="error">Internal error</Message>
    <div v-else-if="result.user_by_pk">
        <div class="grid m-0">
            <div class="col-12 mb-0 flex justify-content-center">
                <img :src="profile_pic" alt="profile picture" height="100" class="mt-2 round-borders" />
            </div>
            <div class="col-12 mb-0 flex justify-content-center">
                <h1 class="font-light mb-0 mt-0">{{ result.user_by_pk.username }}</h1>
            </div>
        </div>
        <div class="grid m-0">
            <div class="col-12 lg:col-5">
                <PostListCard :posts="result.user_by_pk.posts" class="m-3 " />
            </div>
            <div class="col-12 lg:col-5">
                <CommentListCard :comments="result.user_by_pk.comments" class="m-3" />
            </div>
            <div class="col-12 lg:col-2">
                <TagListCard :tags="tags" class="m-3" />
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import PostListCard from "@/components/post/PostListCard.vue";
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from "vue";
import { useRoute } from 'vue-router';
import CommentListCard from "@/components/comment/CommentListCard.vue";
import TagListCard from "@/components/tag/TagListCard.vue";

const { id } = useRoute().params

let tags = ref([]);
const profile_pic = ref()

const { result, loading, error, onResult } = useQuery(gql`
    query UserByPk($id: String!) {
        user_by_pk(id: $id) {
            username
            profile_pic
            posts {
                url
                uuid
                get_title {
                    title
                    error
                }
                post_tags {
                    tag {
                        name
                    }
                }
            }
            comments {
                uuid
                content
                post {
                    url
                    get_title {
                        title
                    }
                    uuid
                }
            }
        }
    }
`, { id })

onResult(({ data }) => {
    tags.value = data.user_by_pk.posts.map(({ post_tags }) => post_tags.map(({ tag }) => tag.name)).flat();
    tags.value = Array.from(new Set(tags.value));
    profile_pic.value = data.user_by_pk.profile_pic ? data.user_by_pk.profile_pic : require('../assets/default-profile-pic.jpg')
})

</script>

<style scoped>
.spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>