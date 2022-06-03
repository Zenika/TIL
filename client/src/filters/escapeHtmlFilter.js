import { computed } from "vue";

export const escapeHtml = str => computed(() => {
    str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // PREVENT HTML INJECTION
    str = str.replace(
        /(https?:\/\/)([^ ]+)/g,
        '<a target="_blank" href="$&">$2</a>'
    ); // INSERT ANCHOR TAGS AROUND LINKS
    return str;
})