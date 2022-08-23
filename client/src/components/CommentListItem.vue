<template>
    <div class="col-12 p-2">
        <div class="col-12 p-0 text-sm font-semibold">
            <UserLink :username="comment?.user.username" :id="comment?.user.id" class="font-semibold" />
        </div>

        <div class="col-12 p-0 font-light">
            <p class="m-0 text-justify word-wrap-break">
                <span v-html="comment?.content"></span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserLink from "../components/UserLink.vue";

defineProps({
    comment: {
        type: Object,
        require: true
    }
});
</script>