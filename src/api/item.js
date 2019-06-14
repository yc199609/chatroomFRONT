import request from '@/utils/request'

const api = {
    getList: '/api/item/getList',
    addItem: '/api/item/addItem',
    deteleById: '/api/item/deteleItem',
    updateById: '/api/item/updateItem'
}

/**
 * @description 获取列表
 * @param { String } userId 用户名Id
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
 * @param { String } obj.title 内容 
 * @param { String } obj.userId 用户名Id
 */
export function addItem(obj){
    return request({
        url: api.addItem,
        method: 'post',
        data: obj
    })
}

/**
 * @description 删除
 * @param  { String } id
 */
export function deteleById(id){
    return request({
        url: api.deteleById,
        method: 'post',
        data: {
            id
        }
    })
}

/**
 * @description 修改
 * @param  { Object } obj
 * @param { String } obj.title 内容 
 * @param { String } obj.id 内容Id
 */
export function updateById(obj){
    return request({
        url: api.updateById,
        method: 'post',
        data: obj
    })
}