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
            <div class="p-0 col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                <TabMenu class="" :model="tabs" v-model:activeIndex="activeIndex" />
                <div class="md:mt-3 md:mx-2">
                    <PostListCard v-if="activeIndex === 0" :posts="result.user_by_pk.posts" />
                    <CommentListCard v-else-if="activeIndex === 1" :comments="result.user_by_pk.comments" />
                    <TagListCard v-else-if="activeIndex === 2" :tags="tags" />
                </div>
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

const tabs = [
    { label: 'Posts', icon: 'pi pi-fw pi-link'},
    { label: 'Comments', icon: 'pi pi-fw pi-comments'},
    { label: 'Tags', icon: 'pi pi-fw pi-tags'},
]

const activeIndex = ref(0)

const { id } = useRoute().params

let tags = ref([]);
const profile_pic = ref()

const { result, loading, error, onResult } = useQuery(gql`
    query UserByPk($id: String!) {
        user_by_pk(id: $id) {
            username
            profile_pic
            posts(order_by: {created_at: desc}) {
                url
                uuid
                title
                post_tags {
                    tag {
                        name
                    }
                }
            }
            comments(order_by: {created_at: desc}) {
                uuid
                content
                post {
                    url
                    title
                    uuid
                }
            }
        }
    }
`, { id })

onResult(({ data }) => {
    tags.value = data.user_by_pk.posts.map(({ post_tags }) => post_tags.map(({ tag }) => ({ name: tag.name }))).flat();

    // Remove all duplicates from tags
    tags.value = tags.value.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.place === value.place && t.name === value.name
        ))
    )
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