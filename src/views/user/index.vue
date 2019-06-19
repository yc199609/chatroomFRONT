<template>
  <div>
    <el-card style="width:60vw;margin:0 auto;">
      <!-- <el-form> -->
      <el-upload
        style="display:inline-block;"
        :show-file-list="false"
        :http-request="upload"
        class="avatar-uploader"
        action="https://esonxie.oss-cn-hangzhou.aliyuncs.com"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:64px;height:64px;">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      {{ form.userName }}
      <!-- </el-form> -->
      <div>
        <el-button @click="handlegoBack">返回</el-button>
      </div>
    </el-card>

    <!-- <el-button @click="getImgSrc">sads</el-button> -->
  </div>

</template>
<script>
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import OSS from 'ali-oss'
import {
  Upload
} from 'element-ui'
Vue.use(Upload)
export default {
  data() {
    return {
      form: {
        userName: ''
      },
      imageUrl: '',
      client: new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIJUrYwKlR1I2z',
        accessKeySecret: 'PwEXbtoOVJpZNLoi409Oayul3IMiZ9',
        bucket: 'yuanc'
      })
    }
  },
  mounted() {
    this.form.userName = getToken()
    this.getImgSrc()
  },
  methods: {
    upload(option) {
      const _this = this
      const file = option.file
      var suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
      const storeAs = 'static/user/' + this.form.userName + '/' + new Date().getTime() + suffix
      this.client
        .multipartUpload(storeAs, file, {})
        .then(res => {
          _this.$message({
            type: 'success',
            message: '上传成功',
            duration: 500
          })
          this.imageUrl = this.client.signatureUrl(res.name)
          option.onSuccess(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getImgSrc() {
      const res = await this.client.list({
        prefix: 'static/user/' + this.form.userName + '/',
        delimiter: '/'
      })
      if (res.objects) {
        this.imageUrl = this.client.signatureUrl(res.objects[res.objects.length - 1].name)
        console.log(this.imageUrl)
      }
    },
    handlegoBack() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
