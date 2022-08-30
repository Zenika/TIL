<template>
  <Button @click.stop="openMenu" class="p-button-secondary p-button-text p-button-sm p-button-rounded"
    icon="pi pi-ellipsis-h" aria-haspopup="true" aria-controls="overlay_menu" data-test="ellipsis" />
  <Menu id="overlay_menu" ref="menu" :popup="true" :model="items" />
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useConfirm } from "primevue/useconfirm";

const emit = defineEmits(["delete-click"]);

const confirm = useConfirm();

const menu = ref();
const items = ref([
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => {
      confirm.require({
        message: "Are you sure you want to delete this comment?",
        acceptLabel: "Delete",
        rejectLabel: "Cancel",
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        accept: () => emit("delete-click")
      });
    },
  },
]);

const openMenu = (event: Event) => {
  menu.value.toggle(event);
};
</script>