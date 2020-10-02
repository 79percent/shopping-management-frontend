import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/welcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/userList',
        component: () => import('../views/userManagement')
      },
      {
        // 指定webpackChunkName可以把多个组件打包进一个文件
        path: '/authorityList',
        component: () => import(/* webpackChunkName: "authorityManagement" */ '../views/authorityManagement/authority')
      },
      {
        path: '/roleList',
        component: () => import(/* webpackChunkName: "authorityManagement" */ '../views/authorityManagement/role')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { path } = to
  if (path === '/login') {
    return next()
  }
  const tokenStr = localStorage.getItem('userName')
  if (!tokenStr) {
    return next('/login')
  } else {
    return next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
