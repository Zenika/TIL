import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView'
import PostView from '@/views/PostView'
import NewPostView from '@/views/NewPostView'
import TagView from '@/views/TagView'
import BookmarksView from '@/views/BookmarksView'
import { authGuard } from '@auth0/auth0-vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: authGuard
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    beforeEnter: authGuard
  },
  {
    path: '/post',
    name: 'new-post',
    component: NewPostView,
    beforeEnter: authGuard
  },
  {
    path: '/tags/:tag',
    name: 'tags',
    component: TagView,
    beforeEnter: authGuard
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: BookmarksView,
    beforeEnter: authGuard
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
