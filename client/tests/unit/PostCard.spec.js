import { config, mount } from '@vue/test-utils'

import PostCard from "@/components/post/PostCard.vue"
import CommentSection from "@/components/comment/CommentSection.vue";
import PostOptionButton from "@/components/post/PostOptionButton.vue";
import Card from 'primevue/card';
import Message from 'primevue/message'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog';

jest.mock('vue-router', () => ({
    __esModule: true,
    useRoute: jest.fn(() => ({
        params: {
            id: '3'
        }
    })),
    useRouter: jest.fn(() => ({})),
}));

jest.mock('@auth0/auth0-vue', () => ({
    __esModule: true,
    useAuth0: jest.fn(() => ({
        user: {
            sub: 'google-oauth2|10296848579QZDQZD'
        }
    })),
}));

jest.mock('primevue/useconfirm', () => ({
    __esModule: true,
    useConfirm: jest.fn(() => ({})),
}));

jest.mock('@/components/comment/CommentSection.vue')
jest.mock('@/components/bookmark/BookmarkButton.vue')

config.global.components = {
    'Card': Card,
    'Message': Message,
    'CommentSection': CommentSection,
    'Menu': Menu,
    'Button': Button,
    'ConfirmDialog': ConfirmDialog,
    'PostOptionButton': PostOptionButton
}

describe('PostCard.vue', () => {
    it('renders a regular post with description', async () => {
        const post = {
            uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            created_at: "2022-03-31T07:26:36.473801+00:00",
            description: "Salut la description yooo",
            title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium",
            user: {
                username: "test.user",
                id: "google-oauth2|10296848579QZDQZD"
            },
            bookmarks: []
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        expect(wrapper.html()).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
        expect(wrapper.html()).toContain(post.title)
        expect(wrapper.html()).toContain(post.user.username)
        expect(wrapper.html()).toContain(post.description)
    })

    it('renders a post without description', async () => {
        const post = {
            uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            created_at: "2022-03-31T07:26:36.473801+00:00",
            title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium",
            user: {
                username: "test.user",
                id: "google-oauth2|10296848579QZDQZD"
            },
            bookmarks: []
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        const html = wrapper.html();
        expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
        expect(html).toContain(post.title)
        expect(html).toContain(post.user.username)
        expect(html).toContain('No description')
    })

    it('renders a post with missing title', () => {
        const post = {
            uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            created_at: "2022-03-31T07:26:36.473801+00:00",
            description: "Salut la description yooo",
            title: null,
            user: {
                username: "test.user",
                id: "google-oauth2|10296848579QZDQZD"
            },
            bookmarks: []
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        const html = wrapper.html();
        expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
        expect(html).toContain(post.url)
        expect(html).toContain(post.user.username)
        expect(html).toContain(post.description)
    })

    it('renders ellipsis menu if the user is the author', () => {
        const post = {
            uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            created_at: "2022-03-31T07:26:36.473801+00:00",
            description: "Salut la description yooo",
            title: "ayo",
            user: {
                username: "test.user",
                id: "google-oauth2|10296848579QZDQZD"
            },
            bookmarks: []
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        expect(wrapper.find('[data-test="ellipsis"]').exists()).toBeTruthy()
    })

    it('does not render ellipsis menu if the user is not the author', () => {
        const post = {
            uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
            url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
            created_at: "2022-03-31T07:26:36.473801+00:00",
            description: "Salut la description yooo",
            title: "ayo",
            user: {
                username: "test.user",
                id: "mauvais id"
            },
            bookmarks: []
        }
        const wrapper = mount(PostCard, {
            props: { post },
        })
        expect(wrapper.find('[data-test="ellipsis"]').exists()).toBeFalsy()
    })
})