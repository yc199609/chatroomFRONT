<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="form.phone" :maxlength="50" clearable />
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" :maxlength="50" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :maxlength="50" clearable />
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="form.checkPass" :maxlength="50" clearable />
        </el-form-item>

        <div class="btnBox">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleRegister">确定</el-button>
        </div>

      </el-form>
    </el-card>
  </div>

</template>
<script>
import Vue from 'vue'
import { register } from '@/api/user'
import {
  Form,
  FormItem
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      form: {
        phone: '',
        userName: '',
        password: '',
        checkPass: ''
      },
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRegister() {
      register(this.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '创建成功',
            duration: 500,
            onClose: () => {
              this.$router.push({ path: '/login' })
            }
          })
        })
    },
    handleCancel() {
      this.$router.push({ path: '/login' })
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

