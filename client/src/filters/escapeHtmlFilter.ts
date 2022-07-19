import { computed } from "vue";

export const escapeHtml = (str: string) => computed(() => {
    if (!str) return null
    str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // PREVENT HTML INJECTION
    str = str.replace(
        /(https?:\/\/)([^ ]+)/g,
        '<a target="_blank" href="$&">$2</a>'
    ); // INSERT ANCHOR TAGS AROUND LINKS
    return str;
})