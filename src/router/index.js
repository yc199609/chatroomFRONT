import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/login') },
    { path: '/', name: 'home', component: () => import('@/views/home') },
    { path: '/register', name: 'register', component: () => import('@/views/register') },
    { path: '/user', name: 'user', component: () => import('@/views/user') }
  ]
})
