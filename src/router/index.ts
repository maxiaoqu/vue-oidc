import router from './setRouter'
import {baseRoutes} from './routerPath'

// 添加参数，避免多次循环导致的错误
var getRouters

// 合并当前所有的路由
const newRouters = (to: any, next: any) => {
  const routerConfig = baseRoutes
  // 因'*'的路由存在baseRoutes里，所以放在最后不会影响其他
  router.addRoutes(routerConfig)
  next({...to, replace: true})
}

// 路由跳转之前
router.beforeEach((to, from, next) => {
  if (!getRouters) {
    getRouters = true
    newRouters(to, next)
  }

  if (to.path === '' || to.path === '/') {
    next({
      path: '/'
    })
  } else {
    next()
  }
})
// 路由跳转之后
router.afterEach((to, from) => {

})

export default router
