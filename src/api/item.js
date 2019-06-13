import request from '@/utils/request'

const api = {
    getList: '/api/item/getList',
    addItem: '/api/item/addItem'
}

/**
 * @description 获取列表
 * @param { Object } userId 用户名Id
 */
export function getList(userid){
    return request({
        url: api.getList,
        method: 'get',
        params: {
            userid
        }
    })
}

/**
 * @description 新增
 * @param  { Object } obj
 * @param { String } obj.userName //用户名 
 * @param { String } obj.password 密码
 * @param { Number } obj.phone 手机号
 */
export function addItem(obj){
    return request({
        url: api.register,
        method: 'post',
        data: obj
    })
}