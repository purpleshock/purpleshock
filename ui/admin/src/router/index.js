import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '../components/layouts'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import { needAnnoymous, needLogin } from './hooks'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          beforeEnter: needAnnoymous,
          component: Login
        },
        {
          path: '/dashboard',
          beforeEnter: needLogin,
          component: Dashboard
        }
      ]
    }
  ]
})

export default router
