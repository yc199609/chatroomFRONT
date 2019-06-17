<template>
  <div>
    <el-upload
      :show-file-list="false"
      :http-request="upload"
      class="avatar-uploader"
      action="https://esonxie.oss-cn-hangzhou.aliyuncs.com"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-button @click="getImgSrc">sads</el-button>
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
      imageUrl: '',
      client: new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIJUrYwKlR1I2z',
        accessKeySecret: 'PwEXbtoOVJpZNLoi409Oayul3IMiZ9',
        bucket: 'yuanc'
      })
    }
  },
  methods: {
    upload(option) {
      const _this = this
      const file = option.file
      var suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
      const storeAs = 'static/user/' + getToken() + '/' + new Date().getTime() + suffix
      this.client
        .multipartUpload(storeAs, file, {})
        .then(res => {
          _this.$message({
            type: 'success',
            message: '上传成功',
            duration: 500
          })
          this.imageUrl = res.url
          option.onSuccess(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getImgSrc() {
      const res = await this.client.list({
        prefix: 'static/user/' + getToken() + '/',
        delimiter: '/'
      })
      if (res.objects) {
        const signUrl = this.client.signatureUrl(res.objects[res.objects.length - 1])
        console.log(signUrl)
      }
    }

  }
}
</script>
