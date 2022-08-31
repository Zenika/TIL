import { useLazyQuery } from '@vue/apollo-composable';
import { DocumentNode } from 'graphql';
import { ref } from "vue"
import { AutoCompleteCompleteEvent } from 'primevue/autocomplete';

export function useSearchAutoComplete(query: DocumentNode) {
    const suggestions = ref(Array<any>());
    const lastSearchedText = ref("");

    const { load, onResult } = useLazyQuery(query)

    const onComplete = (event: AutoCompleteCompleteEvent) => {
        const { query } = event
        if (lastSearchedText.value === query) {
            suggestions.value = [...suggestions.value]
        } else {
            load(undefined, { search: query })
            lastSearchedText.value = query
        }
    }

    return {onResult, suggestions, onComplete, lastSearchedText}
}