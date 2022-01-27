import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import api from '@/api.js'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Home from '../views/Home.vue'
import Post from '../views/Post.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'post/:id',
        props: true,
        component: Post
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/upload',
    component: () => import('../views/Upload.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoutes = ["/profile", "/upload"]
  if(protectedRoutes.includes(to.path) && !store.getters.token)
    next('/login')
  else
    next()
})

export default router
