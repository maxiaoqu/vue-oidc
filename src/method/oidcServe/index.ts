/**
 * @description: 处理单点登录的问题
 */
import common from '../common/index'
import {mgr} from './oidcServe'
import {clearStorage} from "../clearLocal";
import {UserManager} from 'oidc-client'
import Vue from "vue";

const userInfo: string = 'USERINFO'

let mgrServe: any = null
const oidcServe = {
  init() {
    if (!mgrServe) mgrServe = mgr()
    return mgrServe
  },

  // Renew the token manually
  signinRedirectCallback() {
    return new Promise((resolve, reject) => {
      new UserManager({response_mode: "query"}).signinRedirectCallback().then(function (user) {
        sessionStorage.setItem(userInfo, JSON.stringify(user.profile))
        let USERKEY = sessionStorage.getItem("USERKEY");
        if (!Vue.prototype.$Oidc.autoSignout) USERKEY = "";
        // 假如存在
        if (USERKEY && (USERKEY === user.profile.sub)) {
          sessionStorage.setItem("USERKEY", user.profile.sub)
          let url = common.getUrl();
          if (!url) url = "http://www.baidu.com";
          (window as any).location.href = url;
          console.log('signinRedirectCallback has userkey', url)
        } else {
          // @ts-ignore
          sessionStorage.setItem("USERKEY", user.profile.sub);
          (window as any).location.href = "http://www.baidu.com";
          console.log('signinRedirectCallback no userkey')
        }
      }).catch(function (err) {
        console.log('signinRedirectCallback err', err);
        (window as any).location.href = "http://www.baidu.com";
      });
    })
  },

  // Renew the token manually
  renewToken() {
    let self = this
    return new Promise((resolve, reject) => {
      this.init().signinSilent().then(function (user) {
        if (user == null) {
          self.signIn()
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  },

  // Get the user who is logged in
  getUser() {
    let self = this
    return new Promise((resolve, reject) => {
      let URLKEY = sessionStorage.getItem("URLKEY");
      let USERKEY = sessionStorage.getItem("USERKEY");
      let lOGINURL = sessionStorage.getItem("lOGINURL");
      this.init().getUser().then(function (user) {
        if (user === null) {
          clearStorage()
          if (URLKEY) {
            sessionStorage.setItem("URLKEY", URLKEY);
          }
          if (USERKEY) {
            sessionStorage.setItem("USERKEY", USERKEY);
          }
          if (lOGINURL) {
            sessionStorage.setItem("lOGINURL", lOGINURL);
          }
          common.setUrl();
          self.signIn()
          return resolve(null)
        } else {
          sessionStorage.setItem(userInfo, JSON.stringify(user.profile))
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  },

  // Redirect of the current window to the authorization endpoint.
  signIn() {
    this.init().signinRedirect({
      state: {
        message: (window as any).location.href,
        signUpFlag: true
      },
      useReplaceToNavigate: true
    }).then(function (res) {
      console.log('signIn-true', res)
    }).catch(function (err) {
      console.log('signIn-false', err)
    })
  },

  // Redirect of the current window to the end session endpoint
  signOut() {
    //记录在哪个页面退出的，后面再登录可以退回原页面
    common.setUrl();
    this.init().signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }
}

export default oidcServe
