import { mount } from '@vue/test-utils'
import NewPostInput from '@/components/NewPostInput.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { config } from '@vue/test-utils'

config.global.components = {
    'Button': Button,
    'InputText': InputText
}

describe('NewPostInput.vue', () => {
    it('Empty URL', () => {
        const wrapper = mount(NewPostInput)
        wrapper.vm.v$.$validate();

        expect(wrapper.vm.v$.$error).toBe(true)
    })

    it('Invalid URL', async () => {
        const wrapper = mount(NewPostInput)
        const input = wrapper.get('[data-test="input"]')

        await input.setValue("this is not a valid url");
        wrapper.vm.v$.$validate();

        expect(wrapper.vm.v$.$error).toBe(true)
    })

    it('Valid URL', async () => {
        const wrapper = mount(NewPostInput)
        const input = wrapper.get('[data-test="input"]')

        await input.setValue("https://soundcloud.com/help-recordings");
        wrapper.vm.v$.$validate();

        expect(wrapper.vm.v$.$error).toBe(false)
    })
})