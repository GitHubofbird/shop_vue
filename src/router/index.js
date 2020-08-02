import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(`@/views/home`),
      meta: {
        title: '首页'
      }
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/product/:id',
      component: () => import(`@/views/product`),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/cart',
      component: () => import(`@/views/cart`),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/login',
      component: () => import(`@/views/login`),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: () => import(`@/views/register`),
      meta: {
        title: '注册'
      }
    }
  ]
})
