// 清除token
export async function clearCookie() {
  let arr = document.cookie.split("; ");
  let keys = [];
  for (let i = 0; i < arr.length; i++) {
    let arrTemp = arr[i].split("=");
    keys.push(arrTemp[0]);
  }
  keys.forEach(element => {
    let getdate = new Date(new Date().getTime() + -24 * 60 * 60 * 1000)
    document.cookie = element + "=" + '' + ";expires=" + getdate;
  })
}

// 清除localStorage、sessionStorage
export function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

// 清除localStorage、sessionStorage
export function getUrlParams() {
  // 获取url中"?"符后的字串
  let url = window.location.search !== '' ? window.location.search : '?' + window.location.hash.split('?')[1];
  let theRequest = new Object();
  if (url.indexOf("?") !== -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

// 检查App
export function checkApp() {
  let USERKEY = sessionStorage.getItem("USERKEY");
  let Url_USERKEY: any = getUrlParams()
  console.log(9090111, 'APP', USERKEY, 7070111, Url_USERKEY, 6060110, Url_USERKEY.USERKEY, 8989111)
  console.log(111111111, (USERKEY && Url_USERKEY.USERKEY) && (USERKEY !== Url_USERKEY.USERKEY))
  if ((USERKEY && Url_USERKEY.USERKEY) && (USERKEY !== Url_USERKEY.USERKEY)) {
    clearCookie()
    clearStorage()
  }
}
