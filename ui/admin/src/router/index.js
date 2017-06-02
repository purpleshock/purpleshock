import Vue from 'vue'
import Router from 'vue-router'
import { toIndexIfAnnoymous } from './needLogin'
import { Layout } from '../components/layouts'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: Login
        },
        {
          path: '/dashboard',
          beforeEnter: toIndexIfAnnoymous,
          component: Dashboard
        }
      ]
    }
  ]
})
