const URLKEY = "URLKEY"
export default {
  setUrl() {
    if ((window as any).location.href.indexOf('login') === -1 && (window as any).location.href.indexOf('oidc-') === -1) {
      sessionStorage.setItem("URLKEY", (window as any).location.href);
    }
  },
  getUrl() {
    return sessionStorage.getItem(URLKEY)
  }
}
