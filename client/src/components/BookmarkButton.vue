<template>
  <i
    class="pi pi-bookmark cursor-hover hover:text-primary"
    :class="{ 'text-primary': bookmarked }"
    @click.stop="onClick"
  ></i>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useAuth0 } from "@auth0/auth0-vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { user } = useAuth0();

const props = defineProps({
  bookmarked: Boolean,
  uuid: String,
});

let bookmarked = ref(props.bookmarked);

const { mutate: insertBookmark } = useMutation(
  gql`
    mutation InsertBookmark($post_uuid: uuid!, $user_id: String!) {
      insert_bookmark_one(
        object: { post_uuid: $post_uuid, user_id: $user_id }
      ) {
        id
      }
    }
  `
);

const { mutate: deleteBookmark } = useMutation(
  gql`
    mutation DeleteBookmark($post_uuid: uuid!, $user_id: String!) {
      delete_bookmark(
        where: { post_uuid: { _eq: $post_uuid }, user_id: { _eq: $user_id } }
      ) {
        affected_rows
      }
    }
  `
);

const onClick = () => {
  bookmarked.value = !bookmarked.value;
  const params = { post_uuid: props.uuid, user_id: user.value.sub };
  bookmarked.value ? insertBookmark(params) : deleteBookmark(params);
};
</script>