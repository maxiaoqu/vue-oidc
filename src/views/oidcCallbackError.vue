<template>
  <div class="OidcCallbackError">
    <svg
      width="380px"
      height="500px"
      viewBox="0 0 837 1045"
      version="1.1"
    >
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path
          id="Polygon-1"
          d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
          stroke="#007FB2"
          stroke-width="6"
        />
        <path
          id="Polygon-2"
          d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
          stroke="#EF4A5B"
          stroke-width="6"
        />
        <path
          id="Polygon-3"
          d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
          stroke="#795D9C"
          stroke-width="6"
        />
        <path
          id="Polygon-4"
          d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
          stroke="#F2773F"
          stroke-width="6"
        />
        <path
          id="Polygon-5"
          d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
          stroke="#36B455"
          stroke-width="6"
        />
      </g>
    </svg>
    <div class="ErrorPage-box">
      <h1 class="ErrorPage-title">登录状态出错了</h1>
      <p class="ErrorPage-message">
        :( 温馨提示，你可以做以下操作
      </p>
      <div class="ErrorPage-info">
        <h4>您可能要操作：</h4>
        <p>1、若要退出系统，请您关闭浏览器即可</p>
        <p>2、若要重新登录，请点击下面的按钮到登录页面</p>
      </div>
      <div class="ErrorPage-button">
        <div class="ErrorPage-button-group">
          <button
            class="link-button link-back-button"
            @click="gotoLogin">
            登录系统
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {clearStorage, clearCookie} from "@method/clearLocal";

@Component<OidcCallbackError>({
  name: 'OidcCallbackError'
})
export default class OidcCallbackError extends Vue {
  mounted() {
    this.clearStorage()
  }

  // 清除缓存
  private clearStorage() {
    let URLKEY = sessionStorage.getItem("URLKEY");
    let USERKEY = sessionStorage.getItem("USERKEY");
    let lOGINURL = sessionStorage.getItem("lOGINURL");
    clearStorage()
    clearCookie()
    if (URLKEY) {
      sessionStorage.setItem("URLKEY", URLKEY);
      sessionStorage.setItem("USERKEY", USERKEY);
      sessionStorage.setItem("lOGINURL", lOGINURL);
    }
  }

  // 到登录页
  private gotoLogin() {
    if (this.$router) {
      this.$router.replace({
        name: 'login'
      })
    } else {
      (window as any).location.href = '#/login'
    }
  }
}
</script>

<style lang="less" scoped>
.OidcCallbackError {
  width: 100%;
  height: 100%;
  background-color: #2f3242;
  user-select: none;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -400px
  }

  .ErrorPage-box {
    height: 200px;
    width: 380px;
    position: absolute;
    top: 36%;
    left: 50%;
    margin-top: -100px;
    margin-left: 50px;
    color: #fff;
    font-family: Roboto;
    font-weight: 300;

    .ErrorPage {
      &-title {
        font-size: 35px;
        line-height: 46px;
        margin-bottom: 40px
      }

      &-message {
        font-size: 20px;
        font-weight: 600;
        text-align: left;
      }

      &-info {
        padding-top: 20px;
        text-align: left;
        color: #F2773F;

        h4 {
          font-size: 18px;
        }

        p {
          font-size: 16px;
          padding-left: 40px;
          font-weight: 400;
        }
      }

      &-button {
        &-group {
          margin-top: 40px;

          button {
            background: #007FB2;
            padding: 8px 25px;
            border-radius: 4px;
            color: #fff;
            font-weight: 700;
            font-size: 14px;
            transition: all .3s linear;
            border: none;
            cursor: pointer;
            text-decoration: none;
            margin-right: 10px;

            &:hover {
              background: #5a5c6c;
              color: #fff
            }
          }
        }
      }
    }
  }

  #Polygon-1, #Polygon-2, #Polygon-3, #Polygon-4, #Polygon-5 {
    -webkit-animation: float 1s infinite ease-in-out alternate;
    animation: float 1s infinite ease-in-out alternate
  }

  #Polygon-2 {
    -webkit-animation-delay: .2s;
    animation-delay: .2s
  }

  #Polygon-3 {
    -webkit-animation-delay: .4s;
    animation-delay: .4s
  }

  #Polygon-4 {
    -webkit-animation-delay: .6s;
    animation-delay: .6s
  }

  #Polygon-5 {
    -webkit-animation-delay: .8s;
    animation-delay: .8s
  }

  @-webkit-keyframes float {
    100% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px)
    }
  }

  @keyframes float {
    100% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px)
    }
  }

  @media (max-width: 450px) {
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -190px
    }

    .message-box {
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -190px;
      text-align: center
    }
  }
}
</style>
