import router from './router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']
router.beforeEach((to, from, next)=>{
    NProgress.start()
    if(getToken()){
        next()
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(()=>{
    NProgress.done() // 结束Progress
})