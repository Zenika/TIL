import { config, mount } from '@vue/test-utils'

import EditPostCard from "@/components/post/EditPostCard.vue"
import Card from 'primevue/card';
import Button from 'primevue/button'
import TextArea from 'primevue/textarea'
import AutoComplete from 'primevue/autocomplete'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'

config.global.components = {
    'Card': Card,
    'Button': Button,
    'TextArea': TextArea,
    'Message': Message,
    'InputText': InputText,
    'AutoComplete': AutoComplete,
}

describe('EditPostCard.vue', () => {
    it('No props', async () => {
        const wrapper = mount(EditPostCard)
        const input = wrapper.get('[data-test="url"]')
        expect(input.text()).toBe("")
    })

    it('empty url', () => {
        const wrapper = mount(EditPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(true)
        expect(wrapper.emitted('update-click')).toBeUndefined()
    })

    it('invalid url', async () => {
        const wrapper = mount(EditPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        const input = wrapper.get('[data-test="url"]')

        input.setValue("some bullshit");
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(true)
        expect(wrapper.emitted('update-click')).toBeUndefined()
    })

    it('valid url', async () => {
        const wrapper = mount(EditPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        const input = wrapper.get('[data-test="url"]')

        input.setValue("https://www.youtube.com/watch?v=wvZ7ccV8SG8");
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(false)
        expect(wrapper.emitted('update-click')).toBeTruthy()
    })

    it('Loads the url', async () => {
        const post = {
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            description: "",
            post_tags: []
        }
        const wrapper = mount(EditPostCard, {
            props: {
                post,
                loading: false
            },
        })
        const input = wrapper.get('[data-test="url"]')
        expect(input.element.value).toBe(post.url)
    })

    it('Loads the description', async () => {
        const post = {
            url: "",
            description: "Bonsoir description oui",
            post_tags: []
        }
        const wrapper = mount(EditPostCard, {
            props: {
                post,
                loading: false
            },
        })
        const textarea = wrapper.get('[data-test="description"]')
        expect(textarea.element.value).toBe(post.description)
    })

    it('Loads the tags', async () => {
        const post = {
            url: "",
            description: "",
            post_tags: [
                { tag: { name: "html" } },
                { tag: { name: "css" } }
            ]
        }
        const wrapper = mount(EditPostCard, {
            props: {
                post,
                loading: false
            },
        })
        expect(wrapper.vm.state.tags.length).toBe(2)
        expect(wrapper.vm.state.tags[0]).toBe("html")
        expect(wrapper.vm.state.tags[1]).toBe("css")
    })
})