import { useMutation } from "@vue/apollo-composable";
import { useAuth0 } from "@auth0/auth0-vue";


export function useMutationAuth0(mutation, options = {context: {}}) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    options.context.auth0 = {
        getAccessTokenSilently,
        isAuthenticated,
    }

    return useMutation(mutation, options)
}