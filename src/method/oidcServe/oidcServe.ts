import Vue from "vue";
import {UserManager} from 'oidc-client'

var oidcMgr: any = null
export const mgr = () => {
  if (oidcMgr) {
    return oidcMgr
  }

  oidcMgr = new UserManager({
    // authority: 'http://139.224.255.200:3010',
    // client_id: 'platform-vue',
    // response_type: 'code',
    // redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-callback',
    // silent_redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-callback',
    // post_logout_redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-logout',
    // scope: 'address phone email openid profile role area areaCode organizeName workNo BackendAdminAppGateway IdentityService FileService PlatformService MessageService'

    // 其他测试环境
    authority: 'https://demo.identityserver.io/',
    client_id: 'interactive.public',
    redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-callback',
    post_logout_redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-callback',
    silent_redirect_uri: 'http://example.maxiaoqu.com/oidc/#/oidc-callback',
    response_type: 'code',
    scope: 'openid profile email api offline_access',
    automaticSilentRenew: true,
    // @ts-ignore
    automaticSilentSignin: true
  })

  oidcMgr.events.addUserLoaded(function (user) {
    console.log('New User Loaded：', arguments)
    console.log('Acess_token: ', user.access_token)
  })

  oidcMgr.events.addAccessTokenExpiring(function () {
    console.log('AccessToken Expiring：', arguments)
  })

  oidcMgr.events.addAccessTokenExpired(function () {
    console.log('AccessToken Expired：', arguments)
    console.log('Session expired. Going out!')
    oidcMgr.signoutRedirect().then((resp) => {
      console.log('signed out', resp)
    }).catch((err) => {
      console.log(err)
    })
  })

  oidcMgr.events.addSilentRenewError(function () {
    console.log('Silent Renew Error：', arguments)
  })

  oidcMgr.events.addUserSignedOut(function () {
    console.log('UserSignedOut：', arguments)
    console.log('Going out!')
    if (Vue.prototype.$Oidc.autoSignout) {
      oidcMgr.signoutRedirect().then((resp) => {
        console.log('signed out', resp)
      }).catch((err) => {
        console.log(err)
      })
    }
  })
  return oidcMgr
}


