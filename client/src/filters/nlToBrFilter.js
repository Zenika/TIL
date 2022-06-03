import { computed } from "vue";

export const nlToBr = str => computed(() => str ? str.replace(/\n/g, '<br/>') : null)