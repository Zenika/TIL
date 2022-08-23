<template>
    <DataView :value="comments" :layout="'list'">
      <template #list="slotProps">
        <div class="col-12 p-2">
          <div class="col-12 p-0 text-sm font-semibold">
            <UserLink :username="slotProps.data.user.username" :id="slotProps.data.user.id" class="font-semibold"/>
          </div>

          <div class="col-12 p-0 font-light">
            <p class="m-0 text-justify word-wrap-break">
              <span v-html="slotProps.data.content"></span>
            </p>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="mb-2 mt-2"><i>No comments yet.</i></div>
      </template>
    </DataView>
</template>

<script setup lang="ts">
import UserLink from "../components/UserLink.vue";

defineProps({
    comments: {
        type: Object,
        require: true
    },
    brief: {
        type: Boolean
    }
});
</script>