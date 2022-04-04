<template>
  <Card>
    <template #title>
      <div class="flex justify-content-center">
        {{ post.title }}
      </div>
    </template>
    <template #subtitle>{{ post.created_at }}</template>
    <template #content>
      <p class="text-justify">
        {{ post.content }}
      </p>
      <p>By: {{ post.user.username }}</p>
    </template>
    <template #footer>
      <div class="flex justify-content-center">
        <Button
          label="Check it out"
          @click="$router.push(`/post/${post.id}`)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style scoped>
</style>