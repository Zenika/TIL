import { mount } from '@vue/test-utils'
import PostListItem from '@/components/PostListItem.vue'

describe('PostListItem.vue', () => {
  it('renders one post', () => {
    const post = {
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {
        title: "Next steps for Sri Lanka — What is the change we want (and can have)? | by Sanjiva Weerawarana | Apr, 2022 | Medium"
      },
      user: {
        username: "test.user"
      }
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
    expect(html).toContain(post.get_title.title)
    expect(html).toContain(post.user.username)
  })

  it('renders one post with missing title', () => {
    const post = {
      url: "https://medium.com/@sanjiva.weerawarana/next-steps-for-sri-lanka-what-is-the-change-we-want-and-can-have-e172dc8667a7",
      created_at: "2022-03-31T07:26:36.473801+00:00",
      get_title: {},
      user: {
        username: "test.user"
      }
    }
    const wrapper = mount(PostListItem, {
      props: { post },
    })
    const html = wrapper.html();
    expect(html).toContain(new Date(post.created_at.replace(" ", "T")).toLocaleDateString())
    expect(html).toContain(post.url)
    expect(html).toContain(post.user.username)
  })
})