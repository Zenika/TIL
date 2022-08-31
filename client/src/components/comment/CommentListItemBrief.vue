<template>
    <div class="col-12 p-2">
        <div class="col-12 p-0 font-light">
            <p class="m-0 text-justify word-wrap-break overflow-hidden text-overflow-ellipsis white-space-nowrap">
                <span @click.stop="$router.push(`/post/${comment.post.uuid}`)"
                    class="cursor-hover underline-hover">{{ comment.content }}</span>
                -
                <a @click.stop="$router.push(`/post/${comment.post.uuid}`);" class="cursor-hover">
                    {{ comment.post.title ? comment.post.title : comment.post.url }}
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Comment } from '@/models/comment';

defineProps<{
    comment: Comment,
}>()
</script>