import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '../components/layouts'
import { Login, Dashboard, FindVoucher, Voucher } from '../components/pages'
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
        },
        {
          path: '/find-voucher',
          beforeEnter: needLogin,
          component: FindVoucher
        },
        {
          path: '/voucher/:voucherCode',
          beforeEnter: needLogin,
          component: Voucher
        }
      ]
    }
  ]
})

export default router
