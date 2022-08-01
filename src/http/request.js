import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
// import store from '@/store'
import { getToken, setToken } from '@/http/auth'
import errorCode from '@/http/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,

  baseURL: 'https://paasdev.guokang.com',
  // baseURL: 'http://10.10.6.95:59010',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false

  //此处暂时固定token 
  //测试账户2
  // let testToken = 'eyJraWQiOiIwYzk1ODBjYy02OWVkLTQ5MTgtYWQ1MS1mODRlMzgwN2E5OTMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZFR5cGUiOjIwLCJpc3MiOiJ3d3cuZ3Vva2FuZy5jb20iLCJpZCI6MTUzODc3OTUwMDE0MjUyNjQ2NSwiZXhwIjoxNjU5NTEwNDkzMjMxLCJpYXQiOjE2NTg5MDU2OTMyMzEsImp0aSI6IjBjOTU4MGNjLTY5ZWQtNDkxOC1hZDUxLWY4NGUzODA3YTk5MyJ9.bGE_QeWOX-Fy_SBy173Z3RFMPfJLsRDQVuPaV6d5pzOf4FVhfT27Zw4zUKfVLQAGxZ4mw0sOYffEz7AMzBCcsnW-OyVX7iihrHFODdVpEzO1rgItHkXAOipxM9CbgYyMRrKted2juXtE2OCerBrKjDrikFURicwlacG-KWaNyTcaQUn_9SRhR_7K7QcvF1faPXqwqqoQxEE1950rTEXbH9PqxH74hWbXe_jkFWIlqrXIFFMIaPrf726GKqIPp6H1QmfhojHb_Q-7-0Xp4a0KS_aaI4HvPvvUCKsz28I4TVEZj77M5GKxj6E-GoidTjXvA7R2xfop5y70hs775seusA'
  //测试账户
  // let testToken = 'eyJraWQiOiI4NzMwYmI1OC1iZDg4LTQxYjMtOWMyNy01OGI0ZTU4ZjE5OTUiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZFR5cGUiOjIwLCJpc3MiOiJ3d3cuZ3Vva2FuZy5jb20iLCJpZCI6MTUzODc3NDQwMDI3NTc2MzIwMiwiZXhwIjoxNjU5OTM4Mzk5NDAxLCJpYXQiOjE2NTkzMzM1OTk0MDEsImp0aSI6Ijg3MzBiYjU4LWJkODgtNDFiMy05YzI3LTU4YjRlNThmMTk5NSJ9.et42f7LpH40cz06OU09lrelvxftiMBumQc8EkeaQgOIwOdznDWiqtuTeWhmLEgniJuLv_imWeUe07Akg0sKVgvZsHzcoa4BDeMzgAqFmXiFUGYqEF-wSQSc3_iww6_Xl5qLdF1vY6Cgn-kHL9qTvdLsQJK3kqMLCjVcL0HLVxI5scBKCZP_NkT6Zwx1M6UoUcC9XoZVx9yATPer_y4H17kd1qtMBZpfs_aomg9oC3IPFUllpE8_nWO8mKNnOFbmxQ1FND6rtdJDO6OFWgxEQAK3Blevl9uTjpQQiqzzjyOAHr0Sw3_TiDcMAWLzBBC8cMGYL8BfvexfUOAnYfAuT1w'
  
  //guokang
  // let testToken = 'eyJraWQiOiI4YmFmMDlhNy04NDUyLTQzN2YtOTNmYy05Y2IzZTUzMTE2OTMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZFR5cGUiOjIwLCJpc3MiOiJ3d3cuZ3Vva2FuZy5jb20iLCJpZCI6MTU0OTMwMzU5MzgxMjAzMzUzNywiZXhwIjoxNjU5NTA2MDAzMjcyLCJpYXQiOjE2NTg5MDEyMDMyNzIsImp0aSI6IjhiYWYwOWE3LTg0NTItNDM3Zi05M2ZjLTljYjNlNTMxMTY5MyJ9.D9grcSpAQb39EcKnI58irAJ5VmJZGKGw0OjKfc5kU-3t91ZbJ0zKje2WHVz6EdHw8ct5lFYT0f5n-_K1Yt9R9s7GnAKG0Wn9SDtrERQJLGTG9za_Txm15PpNJ56YyxGnpCAHnykYRUKeQV2-i7Vj4yeSLck5sx2S4c7RzfB3-M1yWns7DuF6UVMCI1v3Wpty7FG7cdqZOQXMRwlO9j46iEqYrwudEi2dTTa1H93loIyRughRfUW9cZvUU8XZauJXbQva2HJeKwTl-oxQz_6VEgZ45N7xjjY3UWh5cl3xLh6UarBVPEUo3uKv0dvTRdKYeo3_6e22kg75luK0xsqLIw'

  //fangyongzhi
  let testToken = 'eyJraWQiOiI3Mjk0NWU1NC01OTY0LTRiMGYtYWZmMC0yMjMzNjI4NTY3YzUiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZFR5cGUiOjIwLCJpc3MiOiJ3d3cuZ3Vva2FuZy5jb20iLCJpZCI6MTU1MTg2MTg5ODM5NzE1OTQyNSwiZXhwIjoxNjU5NTExMzQ1NDEwLCJpYXQiOjE2NTg5MDY1NDU0MTAsImp0aSI6IjcyOTQ1ZTU0LTU5NjQtNGIwZi1hZmYwLTIyMzM2Mjg1NjdjNSJ9.KE_MRcNDp3uVajlVbJ426HiO-G6NAePgv1T3cOXGocutgTLGx27zcWpKdhGCai31vMYLMUR-4ncviFtu_P4HTq6WYJ_o6fk-S73hP-Wx4UO75DrSQELXFUioS82DyqCPwSRaSCgU4nNKTq3cUyfl9XKXlGZpYlL1Q8Ja6OQZkzi56G4Qid-OeoZv3cJY-5qYRhL28OLYqnU_Po6JfvLDPYEq2zq1Cqykr98lDCQb9hiEVMqXNBWhyim3iofwqxS8vwC3u9t6K7BtFHVGhRlN5VZGEW7e9x-uCJsy5tOS9fyhK9FHiIPl_yV-Yd9hweskxEiVQ8SAxW7pAOf-kB66mg'
  
  //西瓜
  // let testToken = 'eyJraWQiOiI5ODU1ZWZkOS05Yzk2LTQ4ZGEtYTgzMS1hMGQ5YWNjMTVhNWIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZFR5cGUiOjIwLCJpc3MiOiJ3d3cuZ3Vva2FuZy5jb20iLCJpZCI6MTU1NDAwMTAxODY3MDQ3MzIxNywiZXhwIjoxNjU5OTQyNTkxODEzLCJpYXQiOjE2NTkzMzc3OTE4MTMsImp0aSI6Ijk4NTVlZmQ5LTljOTYtNDhkYS1hODMxLWEwZDlhY2MxNWE1YiJ9.aJ5k6aIGcfDszjouA2QW--FUKao2dpMBNc52RLaDYwEFMMlQXeMk2Td2BZniYo-IL_NHQolKJf588ep_AgYMm80pwqOFhAQrijIW7Mu3f4XRpuNZ7Kvr-yvQW7_7Bv1ZPseTA5QxLyo9FrVVpfRRKRKMsW2mSW1BiDvmfbXUsjjSL603b8PzmoVpWCipMbqAmDCM3h48nR4CMGnOxgI4z_W9-TMIq-zf8xl-MyB3Ua9KMqrC1Bmp60cLmukswTyyNIIEQJzPXzMeiLywF9Vw2yrP0dBtYcp6EflzU_xzQibq0Hl5VPMhBPv64wmhUZijV4btw-a0HFnJwLK7JOaBqQ'
  setToken(testToken)



  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // store.dispatch('LogOut').then(() => {
        //   location.href = '/index';
        // })
      })
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
