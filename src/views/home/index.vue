<template>
  <el-container>
    <el-main>
      <el-card class="card">
        <div style="text-align:right;height:40px;">{{ userName }}</div>
        <div class="searchBox">
          <el-input
            v-model="text"
            class="searchInput"
            type="text"
            placeholder="请输入内容"
            maxlength="90"
          />
          <el-button class="searchBtn" type="primary" plain @click="addItem">确认</el-button>
        </div>
        <el-card
          v-for="(item,index) in list"
          :key="index"
          :body-style="{
            'width': '100%',
            'display': 'flex',
            'flex-direction': 'row',
            'justify-content': 'space-between',
            'margin-bottom': '10px'
          }"
          class="listcard"
        >
          <div class="cardContent">
            <span style="margin-right:20px;">{{ item.user.userName+':' }}</span>
            <div v-if="item.mode==='edit'">
              <el-input v-model="item.title" />
              <el-button @click="update(item)">修改</el-button>
            </div>
            <div v-else>
              <span @click="edit(item)">{{ item.title }}</span>
            </div>
          </div>
          <!-- <el-button v-if="item.user._id===userId" type="text" @click="deleteItem(item)">点击删除</el-button> -->
        </el-card>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { deteleById, updateById } from '@/api/item'
import { getUserId, getToken } from '@/utils/auth'
export default {
  name: 'App',
  data() {
    return {
      websock: '',
      userId: '',
      userName: '',
      text: '',
      list: [
        {
          title: '',
          mode: '',
          user: {
            userName: ''
          }
        }
      ]
    }
  },
  created() {
    this.userId = getUserId()
    this.userName = getToken()
  },
  mounted() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket() {
      // const wsurl = 'ws://39.106.80.90:3000/ws'
      const wsurl = 'ws://localhost:3000/ws'
      this.websock = new WebSocket(wsurl)
      this.websock.onopen = this.websocketonopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketonclose
    },
    websocketonopen() {
      console.log('连接开始')
    },
    websocketonmessage(e) {
      const res = (JSON.parse(e.data))
      this.$set(this, 'list', res.data)
      this.text = ''
    },
    websocketonerror() {
      alert('连接失败')
      this.initWebSocket()
    },
    websocketonclose(e) {
      console.log(e)
    },
    addItem() {
      this.websock.send(JSON.stringify({
        title: this.text,
        userId: this.userId
      }))
    },
    deleteItem(item) {
      deteleById(item._id)
        .then(res => {
          this.message(res, () => {
            this.init()
          })
        })
    },
    update(item) {
      updateById({
        title: item.title,
        id: item._id
      })
        .then(res => {
          this.message(res, () => {
            this.$set(item, 'mode', 'show')
            this.init()
          })
        })
    },
    edit(item) {
      if (item.user._id === this.userId) {
        this.$set(item, 'mode', 'edit')
      }
    },
    message(res, callback) {
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '成功',
          duration: 500,
          onClose: () => {
            callback()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .searchBox{
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
    flex-direction: row;
    .searchInput{
      flex: 1;
      margin-right: 10px;
    }
  }
  .card{
    min-height: 400px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .listcard{
    width: 100% ;
    display: flex ;
    flex-direction: row ;
    justify-content: space-between ;
    margin-bottom: 10px ;
  }
  .cardContent{
    font-size: 14px;
    display: flex;
    align-items: center;
  }
</style>
