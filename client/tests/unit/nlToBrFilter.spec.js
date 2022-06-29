import { config, mount } from '@vue/test-utils'
import { nlToBr } from "@/filters/nlToBrFilter"

describe('nlToBrFilter', () => {
    it('should return null is string is null or undefined', () => {
        expect(nlToBr(null).value).toBeNull()
        expect(nlToBr().value).toBeNull()
    })

    it('should replace a single \\n into <br/>', () => {
        const test = "salut\nca va"
        expect(nlToBr(test).value).toBe("salut<br/>ca va")
    })

    it('should replace multiple \\n into <br/>', () => {
        const test = "salut\nca\nva"
        expect(nlToBr(test).value).toBe("salut<br/>ca<br/>va")
    })
})