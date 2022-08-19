<template>
    <NavBar />
    <ProgressSpinner v-if="loading" class="spinner" />
    <Message v-else-if="error" severity="error">Internal error</Message>
    <div v-else-if="result.user_by_pk">
        <div class="grid m-0">
            <div class="col-12 mb-0 flex justify-content-center">
                <h1 class="font-light mb-0 mt-0">{{ result.user_by_pk.username }}</h1>
            </div>
        </div>
        <div class="flex">
            <Card class="m-3 p-0 w-5">
                <template #title>
                    Posts
                </template>
                <template #subtitle>
                    {{ result.user_by_pk.posts_aggregate.aggregate.count }} Posts
                </template>
                <template #content>
                    <PostList :posts="result.user_by_pk.posts" :brief="true" @on-refresh="refetch" />
                </template>
            </Card>
            <Card class="m-3 p-0 w-5">
                <template #title>
                    Comments
                </template>
                <template #subtitle>
                    {{ result.user_by_pk.comments_aggregate.aggregate.count }} Comments
                </template>
                <template #content>
                    <div v-for="comment in result.user_by_pk.comments" :key="comment.uuid">
                        {{ comment.content }}
                    </div>
                </template>
            </Card>
            <Card class="m-3 p-0 w-5">
                <template #title>
                    Tags
                </template>
                <template #subtitle>
                    {{ tags.length }} Tags
                </template>
                <template #content>
                    <TagWrapper class="mb-1 mr-1" v-for="tag in tags" :key="tag" :value="tag" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import PostList from "@/components/PostList.vue";
import TagWrapper from "@/components/wrappers/TagWrapper.vue";
import { Tag } from "@/models/tag";
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from "vue";
import { useRoute } from 'vue-router';

const { id } = useRoute().params

let tags = ref([]);

const { result, loading, error, onResult } = useQuery(gql`
    query UserByPk($id: String!) {
        user_by_pk(id: $id) {
            username
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
            posts_aggregate {
                aggregate {
                    count
                }
            }
            comments_aggregate {
                aggregate {
                    count
                }
            }
            comments {
                uuid
                content
            }
        }
    }
`, { id })

onResult(({ data }) => {
    tags.value = data.user_by_pk.posts.map(({ post_tags }) => post_tags.map(({ tag }) => tag.name)).flat();
    tags.value = Array.from(new Set(tags.value));
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