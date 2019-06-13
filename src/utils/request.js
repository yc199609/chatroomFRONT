import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
const service = axios.create({
    baseURL:'/api',
    withCredentials: true, // 跨域带cookie
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// request拦截器
// service.interceptors.request.use(
//     config => {
//       if (store.getters.token) {
//         config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//       }
//       return config
//     },
//     error => {
//       // Do something with request error
//       Promise.reject(error)
//     }
//  )

// response 拦截器
service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== 0) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    error => {
      const status = error.response.status
      if (status === 401) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        })
      }
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
)
  
export default service