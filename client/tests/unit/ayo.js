import {render, fireEvent} from '@testing-library/vue'
import ArticleCard from '@/components/ArticleCard.vue'


test('increments value on click', async () => {
  const post = {
    title: "super le titre",
    created_at: "demain",
    content: "c'est un scoop",
    user: {
      username: "eric"
    },
    id: 3
  }
  // The render method returns a collection of utilities to query your component.
  const {getByText} = render(ArticleCard, {
    props: { post },
    global: {
      components: {
        Button,
        Card
      }
    }
  })

  // getByText returns the first matching node for the provided text, and
  // throws an error if no elements match or if more than one match is found.
  getByText(title.title)
  getByText(title.created_at)
  getByText(title.content)
  getByText(title.user.username)
})