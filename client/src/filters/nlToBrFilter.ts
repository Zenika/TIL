import { computed } from "vue";

export const nlToBr = (str: string) => computed(() => str ? str.replace(/\n/g, '<br/>') : null)