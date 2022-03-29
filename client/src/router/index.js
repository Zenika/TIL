import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView'
import NewPostView from '../views/NewPostView'
import PostView from '../views/PostView'
import AuthorListView from '../views/AuthorListView'
import AuthorProfileView from '../views/AuthorProfileView'
import { authGuard } from '@auth0/auth0-vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'new-post',
    component: NewPostView,
    beforeEnter: authGuard
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorListView
  },
  {
    path: '/author/:id',
    name: 'author',
    component: AuthorProfileView
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
