import request from '@/utils/request'

const api = {
    login: '/api/user/login',
    register: '/api/user/register'
}

/**
 * @description 登录
 * @param { Object } obj
 * @param { String } obj.userName 用户名 
 * @param { String } obj.password 密码
 */
export function login(obj){
    return request({
        url: api.login,
        method: 'post',
        data: obj
    })
}

/**
 * @description 注册
 * @param  { Object } obj
 * @param { String } obj.userName //用户名 
 * @param { String } obj.password 密码
 * @param { Number } obj.phone 手机号
 */
export function register(obj){
    return request({
        url: api.register,
        method: 'post',
        data: obj
    })
}