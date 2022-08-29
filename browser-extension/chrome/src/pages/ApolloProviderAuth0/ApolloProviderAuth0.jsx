import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const ApolloProviderAuth0 = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0();

    const httpLink = createHttpLink({
        uri: process.env.REACT_APP_AUTH0_AUDIENCE,
    });

    const authLink = setContext(async (_, { headers, ...rest }) => {
        let token;
        try {
            token = await getAccessTokenSilently();
        } catch (error) {
            console.log(error);
        }

        if (!token) return { headers, ...rest };

        return {
            ...rest,
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        };
    });

    const client = React.useRef();

    if (!client.current) {
        client.current = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }

    return (
        <ApolloProvider client={client.current}>
            {children}
        </ApolloProvider>
    );
};

export { ApolloProviderAuth0 };