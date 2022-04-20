export function useUserInfo() {
    return JSON.parse(sessionStorage.getItem("user")) || null
}