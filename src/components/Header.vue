<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <el-row :gutter=12>
            <el-col :span="8" class="title">
              <div class="txt">江苏理工学院无人车管理系统</div>
            </el-col>
            <el-col :span="8">
                <span>&nbsp;</span>
            </el-col>
            <el-col :span="4">
              <span @click="singOut">注销</span>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
   
    export default {
        data() {
            return {
            }
        },
        methods:{
            singOut(){
                this.$router.push({path:'/login'})
            }
        }
    }
</script>
<style lang="less" scoped>
    .header {
      background:#434343;
      height: 50px;
      min-width: 1450px;
      color: white;
      line-height: 50px;
      text-align: left;
      font-size: 18px;
      .title{
          margin: 0 100px;
      }
   }
   
    
</style>


