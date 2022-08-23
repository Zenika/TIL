import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostView from '@/views/PostView.vue'
import NewPostView from '@/views/NewPostView.vue'
import TagView from '@/views/TagView.vue'
import BookmarksView from '@/views/BookmarksView.vue'
import UserView from '@/views/UserView.vue'
import { authGuard } from '@auth0/auth0-vue'
import EditPostView from '@/views/EditPostView.vue'

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
    path: '/post/:id/edit',
    name: 'post-edit',
    component: EditPostView,
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
    path: '/user/:id',
    name: 'user',
    component: UserView,
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
