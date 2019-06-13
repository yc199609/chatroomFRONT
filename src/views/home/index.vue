<template>
  <el-container>
    <el-main>
          <el-card class="card">
            <div class="searchBox">
              <el-input
                  class="searchInput"
                  type="text"
                  placeholder="请输入内容"
                  v-model="text"
                  maxlength="90"
                />
                <el-button class="searchBtn" type="primary" plain @click="addItem">确认</el-button>
            </div>
            <el-card
              :body-style="{
                'width': '100%',
                'display': 'flex',
                'flex-direction': 'row',
                'justify-content': 'space-between',
                'margin-bottom': '10px'
              }"
              class="listcard"
              v-for="(item,index) in list"
              :key="index">
              <div v-if="item.mode==='edit'" class="cardContent">
                <el-input  v-model="item.title" />
                <el-button @click="update(item)">修改</el-button>
              </div>
              <div v-else class="cardContent">
                <span @click="edit(item)">{{ item.title }}</span>
              </div>
              <el-button type="text" @click="deleteItem(item)">点击删除</el-button>
            </el-card>
          </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      text:'',
      list:[
        {
          title:'',
          mode:''
        }
      ],
      console:console
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.axios.get('/api/item/getList')
      .then(res=>{
        this.$set(this,'list',res.data.data)
      })
    },
    addItem(){
      this.axios.post('/api/item/addItem',{
        title:this.text
      })
        .then(res =>{
          const  result = res.data
          if(result.code === 0){
            this.$message({
              type:"success",
              message:'成功',
              duration:500,
              onClose:()=>{
                this.text = ''
                this.init()
              }
            })
          }
        })
    },
    deleteItem(item){
      this.axios.post('/api/item/deteleItem',{ id: item._id})
        .then(res=>{
          const result = res.data
          if(result.code === 0){
            this.$message({
              type:"success",
              message:'成功',
              duration:500,
              onClose:()=>{
                this.init()
              }
            })
          }
        })
    },
    update(item){
      this.axios.post('/api/item/updateItem',{
        title:item.title,
        id:item._id
      })
      .then(res=>{
        const  result = res.data
          if(result.code === 0){
            this.$message({
              type:"success",
              message:'成功',
              duration:500,
              onClose:()=>{
                this.$set(item,'mode','show')
                this.init()
              }
            })
          }
      })
    },
    edit(item){
      this.$set(item,'mode','edit')
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
