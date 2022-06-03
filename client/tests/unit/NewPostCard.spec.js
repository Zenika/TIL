import { config, mount } from '@vue/test-utils'

import NewPostCard from "@/components/NewPostCard.vue"
import Card from 'primevue/card';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/TextArea';
import Chips from 'primevue/chips';

config.global.components = {
    'Button': Button,
    'Card': Card,
    'TextArea': TextArea,
    'Chips': Chips,
    'InputText': InputText
  }

describe('NewPostCard.vue', () => {
    it('empty url', () => {
        const wrapper = mount(NewPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(true)
        expect(wrapper.emitted('post-click')).toBeUndefined()
    })

    it('invalid url', async () => {
        const wrapper = mount(NewPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        const input = wrapper.get('[data-test="url"]')

        input.setValue("some bullshit");
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(true)
        expect(wrapper.emitted('post-click')).toBeUndefined()
    })

    it('valid url', async () => {
        const wrapper = mount(NewPostCard)
        const submit = wrapper.get('[data-test="submit"]')
        const input = wrapper.get('[data-test="url"]')

        input.setValue("https://www.youtube.com/watch?v=wvZ7ccV8SG8");
        submit.trigger('click')
        expect(wrapper.vm.v$.$error).toBe(false)
        expect(wrapper.emitted('post-click')).toBeTruthy()
    })
})