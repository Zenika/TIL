import { mount } from '@vue/test-utils'
import PostListItem from '@/components/PostListItem.vue'
import { config } from '@vue/test-utils'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog';
import PostOptionButton from "@/components/PostOptionButton.vue";

config.global.components = {
  'Button': Button,
  'ConfirmDialog': ConfirmDialog,
  'PostOptionButton': PostOptionButton
}

jest.mock('@/components/BookmarkButton.vue')

jest.mock('@auth0/auth0-vue', () => ({
  __esModule: true,
  useAuth0: jest.fn(() => ({
      user: {
          sub: 'google-oauth2|10296848579QZDQZD'
      }
  })),
}));

jest.mock('vue-router', () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({})),
}));

describe('PostListItem.vue', () => {
  it('renders one post', () => {
    const post = {
      uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {
        title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium"
      },
      user: {
        username: "test.user"
      },
      comments_aggregate: {
        aggregate: {
          count: 0
        }
      },
      bookmarks: []
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
    expect(html).toContain(post.get_title.title)
    expect(html).toContain(post.user.username)
    expect(html).toContain("0")
  })

  it('renders one post with missing title', () => {
    const post = {
      uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {},
      user: {
        username: "test.user"
      },
      comments_aggregate: {
        aggregate: {
          count: 0
        }
      },
      bookmarks: []
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
    expect(html).toContain(post.url)
    expect(html).toContain(post.user.username)
    expect(html).toContain("0")
  })

  it('renders one post with one comment', () => {
    const post = {
      uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {},
      user: {
        username: "test.user"
      },
      comments_aggregate: {
        aggregate: {
          count: 1
        }
      },
      bookmarks: []
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain("1")
  })

  it('renders one post with multiple comments', () => {
    const post = {
      uuid: "6a3139a5-e796-43cc-a6af-b22577933fa8",
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {},
      user: {
        username: "test.user"
      },
      comments_aggregate: {
        aggregate: {
          count: 15
        }
      },
      bookmarks: []
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain("15")
  })
})