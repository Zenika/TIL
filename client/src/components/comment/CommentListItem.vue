<template>
    <div class="col-12 p-2 flex justify-content-between">
        <div>
            <div class="p-0 text-sm font-semibold">
                <UserLink :username="comment?.user.username" :id="comment?.user.id" class="font-semibold" />
            </div>
            <div class="p-0 font-light">
                <p class="m-0 text-justify word-wrap-break">
                    <span v-html="comment?.content"></span>
                </p>
            </div>
        </div>
        <PostOptionButton v-if="comment.user.id === user.sub" :postId="comment.uuid"
            @delete-click="emit('delete-click', comment.uuid)" />
    </div>

</template>

<script setup lang="ts">
import UserLink from "@/components/UserLink.vue";
import { Comment } from "@/models/comment";
import { useAuth0 } from "@auth0/auth0-vue";
import PostOptionButton from "./CommentOptionButton.vue"

defineProps<{
    comment: Comment,
}>()

const emit = defineEmits(["delete-click"]);

const { user } = useAuth0();
</script>