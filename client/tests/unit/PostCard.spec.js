import { config, mount } from '@vue/test-utils'

import PostCard from "@/components/PostCard.vue"
import CommentSection from "@/components/CommentSection.vue";
import Card from 'primevue/card';
import Message from 'primevue/message'

jest.mock('vue-router', () => ({
    __esModule: true,
    useRoute: jest.fn(() => ({
        params: {
            id: '3'
        }
    })),
}));

jest.mock('@/components/CommentSection.vue')
jest.mock('@/components/BookmarkButton.vue')

config.global.components = {
    'Card': Card,
    'Message': Message,
    'CommentSection': CommentSection
}

describe('PostCard.vue', () => {
    it('No props', async () => {
        const wrapper = mount(PostCard)
        expect(wrapper.html()).toContain('Internal error')
    })

    it('renders a regular post with description', async () => {
        const post = {
            post_by_pk: {
                uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
                url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
                created_at: "2022-03-31T07:26:36.473801+00:00",
                description: "Salut la description yooo",
                get_title: {
                    title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium"
                },
                user: {
                    username: "test.user"
                },
                bookmarks: []
            }
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        expect(wrapper.html()).toContain(new Date(post.post_by_pk.created_at.replace(" ", "T")).toLocaleDateString())
        expect(wrapper.html()).toContain(post.post_by_pk.get_title.title)
        expect(wrapper.html()).toContain(post.post_by_pk.user.username)
        expect(wrapper.html()).toContain(post.post_by_pk.description)
    })

    it('renders a post without description', async () => {
        const post = {
            post_by_pk: {
                uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
                url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
                created_at: "2022-03-31T07:26:36.473801+00:00",
                get_title: {
                    title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium"
                },
                user: {
                    username: "test.user"
                },
                bookmarks: []
            }
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        expect(wrapper.html()).toContain(new Date(post.post_by_pk.created_at.replace(" ", "T")).toLocaleDateString())
        expect(wrapper.html()).toContain(post.post_by_pk.get_title.title)
        expect(wrapper.html()).toContain(post.post_by_pk.user.username)
        expect(wrapper.html()).toContain('No description')
    })

    it('renders a post with missing title', () => {
        const post = {
            post_by_pk: {
                uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
                url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
                created_at: "2022-03-31T07:26:36.473801+00:00",
                description: "Salut la description yooo",
                get_title: {},
                user: {
                    username: "test.user"
                },
                bookmarks: []
            }
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        const html = wrapper.html();
        expect(wrapper.html()).toContain(new Date(post.post_by_pk.created_at.replace(" ", "T")).toLocaleDateString())
        expect(wrapper.html()).toContain(post.post_by_pk.url)
        expect(wrapper.html()).toContain(post.post_by_pk.user.username)
        expect(wrapper.html()).toContain(post.post_by_pk.description)
    })
})