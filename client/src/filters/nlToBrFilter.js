import { computed } from "vue";

export const nlToBr = str => computed(() => str.replace(/\n/g, '<br/>'))