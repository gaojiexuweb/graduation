<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <el-row>
            <el-col :span="1">
              <div>&nbsp;</div>
            </el-col>
            <el-col :span="9">
              <div>江苏理工学院无人车信息管理系统</div>
            </el-col>
            <el-col :span="10">
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
      color: white;
      line-height: 50px;
      text-align: left;
      font-size: 18px;
   }
   
    
</style>


