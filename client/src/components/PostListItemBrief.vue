<template>
    <div class="w-full p-2">
        <p class="m-0 overflow-hidden text-overflow-ellipsis white-space-nowrap">
            <a :href="post.url" target="_blank" rel="noopener noreferrer" @click.stop="">
                {{ post.get_title.title ? post.get_title.title : post.url }}
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