import { config, mount } from '@vue/test-utils'
import { escapeHtml } from "@/filters/escapeHtmlFilter"

describe('escapeHtmlFilter', () => {
    it('should return null is string is null or undefined', () => {
        expect(escapeHtml(null).value).toBeNull()
        expect(escapeHtml().value).toBeNull()
    })

    it('should escape html', () => {
        const test = "<div>salut</div>"
        expect(escapeHtml(test).value).toBe("&lt;div&gt;salut&lt;/div&gt;")
    })

    it('should insert an ahcor tag around links', () => {
        const test = "hey https://www.google.com/ ca va"
        expect(escapeHtml(test).value).toBe('hey <a target="_blank" href="https://www.google.com/">www.google.com/</a> ca va')
    })

    it('should do both the aboe at the same time', () => {
        const test = "<div>hey https://www.google.com/ ca va</div>"
        expect(escapeHtml(test).value).toBe('&lt;div&gt;hey <a target="_blank" href="https://www.google.com/">www.google.com/</a> ca va&lt;/div&gt;')
    })
})