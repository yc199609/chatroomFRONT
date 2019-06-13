<template>
    <div class="container">
        <el-card>
            <el-form  label-width="80px">
                <el-form-item label="用户名">
                    <el-input :maxlength="50" clearable v-model="form.userName" />
                </el-form-item>

                <el-form-item label="密码">
                    <el-input :maxlength="50" type="password" clearable v-model="form.password" @keyup.enter.native="handleLogin" />
                </el-form-item>

                <div class="btnBox">
                    <el-button @click="handleLogin">确定</el-button>
                    <el-button @click="handleRegister" type="text">没有账号?</el-button>
                </div>

            </el-form>
        </el-card>
    </div>
    
</template>
<script>
import Vue from 'vue'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import {
    Form,
    FormItem
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
export default {
    data(){
        return{
            form:{
                userName:'',
                password:''
            }
        }
    },
    methods:{
        handleLogin(){
            login(this.form)
                .then(res=>{
                    setToken(res.data.userName)
                    this.$router.push({ path: '/' })
                })
        },
        handleRegister(){
            this.$router.push({ path: '/register' })
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        .btnBox{
            text-align: center;
        }
    }
</style>
<style scoped>
    .container >>> .el-form-item__label{
        text-align: left;
    }
</style>


