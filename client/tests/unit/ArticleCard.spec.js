import { mount } from '@vue/test-utils'
import ArticleCard from '@/components/ArticleCard.vue'
import Button from 'primevue/button'
import Card from 'primevue/card'

describe('ArticleCard.vue', () => {
  it('renders props.msg when passed', () => {
    const post = {
      title: "super le titre",
      created_at: "demain",
      content: "c'est un scoop",
      user: {
        username: "eric"
      },
      id: 3
    }
    const wrapper = mount(ArticleCard, {
      props: { post },
      global: {
        components: {
          Button,
          Card
        }
      }
    })
    const html = wrapper.html();
    expect(html).toContain(post.title)
    expect(html).toContain(post.created_at)
    expect(html).toContain(post.content)
    expect(html).toContain(post.user.username)
  })
})
