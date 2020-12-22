import {RouteConfig} from 'vue-router'

// 基础页面路由
export const baseRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/oidc-callback',
    meta: {
      title: '首页'
    }
  }, {
    path: '/oidc-callback',
    name: 'oidc-callback',
    meta: {
      icon: 'icon-name',
      hidden: true,
      title: '单点登录回调页面'
    },
    component: () => import('@/views/oidcCallback.vue')
  }, {
    path: '/oidc-logout',
    name: 'oidc-logout',
    meta: {
      icon: 'icon-name',
      hidden: true,
      title: '单点退出登录回调'
    },
    component: () => import('@/views/oidcLogout.vue')
  }, {
    path: '/oidc-renew',
    name: 'oidc-renew',
    meta: {
      icon: 'icon-name',
      hidden: true,
      title: '单点登录其他操作'
    },
    component: () => import('@/views/oidcCallbackError.vue')
  }
]
