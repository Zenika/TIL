<template>
    <div class="w-full p-2">
        <p class="m-0 overflow-hidden text-overflow-ellipsis white-space-nowrap">
            <a @click.stop="$router.push(`/post/${post.uuid}`);" class="cursor-hover">
                {{ post.title ? post.title : post.url }}
            </a>
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    post: {
        type: Object,
        required: true
    },
});
</script>