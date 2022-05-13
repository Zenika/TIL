<template>
  <div v-if="!isLoading">
    <MenuBar :model="menuSchema">
      <template #start>
        <img
          alt="logo"
          src="../assets/logo-zenika.svg"
          height="40"
          class="mr-2"
        />
      </template>
      <template #end>
        <div class="flex align-items-center">
          <span class="mr-2">{{ user.nickname }}</span>
          <Button label="Log out" @click="onLogoutClick" />
        </div>
      </template>
    </MenuBar>
  </div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";

const menuSchema = ref([
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
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
]);

const { logout, user, isLoading } = useAuth0();

const onLogoutClick = () => {
  logout({ returnTo: window.location.origin });
};

if (!sessionStorage.getItem("user"))
  sessionStorage.setItem("user", JSON.stringify(user.value));
</script>

<style>
</style>