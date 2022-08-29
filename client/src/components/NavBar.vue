<template>
  <div v-if="!isLoading">
    <MenuBar :model="menuSchema">
      <template #start>
        <img alt="logo" src="../assets/logo-TIL.svg" height="40" class="ml-2 mr-1 cursor-hover"
          @click="$router.push('/')" />
      </template>
      <template #end>
        <div class="flex align-items-center">
          <SearchInput />
          <img :src="user.picture" alt="profile picture" @click="$router.push(`/user/${user.sub}`)"
            class="h-3rem mr-2 round-borders cursor-hover">
          <UserLink :username="user.nickname!" :id="user.sub!" class="mr-2" />
          <Button label="Log out" @click="onLogoutClick" />
        </div>
      </template>
    </MenuBar>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import SearchInput from "@/components/search/SearchInput.vue";
import UserLink from "@/components/UserLink.vue";

const menuSchema = ref([
  {
    label: "New post",
    icon: "pi pi-fw pi-link",
    to: "/post",
  },
  {
    label: "Bookmarks",
    icon: "pi pi-fw pi-bookmark",
    to: "/bookmarks",
  },
  {
    label: "Extension",
    icon: "pi pi-fw pi-external-link",
    url: "https://chrome.google.com/webstore/detail/til/beongpgiledmjeadadaeflfdgjobelmd?hl=fr&authuser=1",
    target: "_blank"
  },
]);

const { logout, user, isLoading } = useAuth0();

const onLogoutClick = () => {
  logout({ returnTo: window.location.origin });
};
</script>

<style>
</style>