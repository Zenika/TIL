import { useQuery } from "@vue/apollo-composable";
import { useAuth0 } from "@auth0/auth0-vue";


export function useQueryAuth0(mutation, variables, options = {context: {}}) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    options.context.auth0 = {
        getAccessTokenSilently,
        isAuthenticated,
    }

    return useQuery(mutation, variables, options)
}