<template>
  <div v-if="!isLoading">
    <MenuBar :model="menuSchema">
      <template #end>
        <div v-if="isAuthenticated">
          <!-- <Button
            label="New post"
            class="p-button-text"
            @click="$router.push(`/post`)"
          /> -->
          <Button label="Log out" @click="onLogoutClick" />
        </div>
        <div v-else>
          <Button label="Log in" @click="loginWithRedirect" />
        </div>
      </template>
    </MenuBar>
  </div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { watch } from "@vue/runtime-core";
import { ref } from "vue";

const menuSchema = ref([
  // {
  //   label: "Home",
  //   icon: "pi pi-fw pi-home",
  //   to: "/"
  // },
  // {
  //   label: "Authors",
  //   icon: "pi pi-fw pi-users",
  //   to: '/authors'
  // },
]);

const {
  logout,
  loginWithRedirect,
  user,
  isAuthenticated,
  isLoading,
} = useAuth0();

const onLogoutClick = () => {
  logout({ returnTo: window.location.origin });
};

watch(user, async (newVal) => {
  if (newVal) {
    sessionStorage.setItem("user", JSON.stringify(newVal));
  } else sessionStorage.clear();
});
</script>

<style>
</style>