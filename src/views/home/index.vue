<template>
    <el-container>
        <el-header>
            <el-menu 
                :default-active="activeIndex" 
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect"
                background-color="#1f2d3d"
                text-color="#FFF"
                active-text-color="#1890ff"
                >
                <el-menu-item index="1">流程分类</el-menu-item>
                <el-menu-item index="2">我的工作台</el-menu-item>
                <el-menu-item index="3">流程实例</el-menu-item>
                <el-menu-item index="4">流程管理</el-menu-item>
                <el-menu-item index="5">表单设计</el-menu-item>
                <el-menu-item index="6">流程详情</el-menu-item>
                <el-menu-item index="7">我的流程记录</el-menu-item>
                <el-menu-item index="8">待办任务</el-menu-item>
                <el-menu-item index="9">已办任务</el-menu-item>
                <el-menu-item index="10">抄送我的</el-menu-item>
            </el-menu>

        </el-header>
        <!-- <el-container> -->
            <div style="padding:20px">
                <router-view></router-view>
                <!-- <approve-list ></approve-list> -->
            </div>
            
            <!-- <el-aside width="200px">
                <el-menu
                    default-active="2"
                    class="aside-menu">
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航一</span>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
            </el-aside> -->
            <!-- <el-main>
                
            </el-main> -->  
        <!-- </el-container> -->
    </el-container>
</template>

<script>
import approveList from '@/components/approveList'

export default {
    components:{
        approveList,
    },
    data(){
        return{
            Msg:'首页',
            activeIndex: '2',
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.activeIndex = key
      },
      toCategory(){
        console.log("toCategory")
        this.$router.push('/category')
      },
      toApprove(){
        console.log("toApprove")
        this.$router.push('/approve')
      },
      toFlow(){
        console.log("toFlow")
        this.$router.push('/flow')
      }
    },
    created(){
        // this.toApprove()
    },
    watch:{
        activeIndex:{
            immediate:true,
            handler(newVal, oldVal){
                switch(newVal){
                    case '1' :
                        console.log("toCategory")
                        this.$router.push('/category')
                        break;
                    case '2' :
                        console.log("toApprove")
                        this.$router.push('/approve')
                        break;
                    case '3' :
                        console.log("toFlow")
                        this.$router.push('/process')
                        break;
                    case '4' :
                        console.log("toFlow")
                        this.$router.push('/flow')
                        break;
                    case '5' :
                        console.log("toForm")
                        this.$router.push('/form')
                        break;
                    case '6' :
                        console.log("toprocessDetail")
                        this.$router.push('/processDetail')
                        break;
                    case '7' :
                        console.log("toOwn")
                        this.$router.push('/own')
                        break;
                    case '8' :
                        console.log("toTodo")
                        this.$router.push('/todo')
                        break;
                    case '9' :
                        console.log("toFinished")
                        this.$router.push('/finished')
                        break;
                    case '10' :
                        console.log("toCopy")
                        this.$router.push('/copy')
                        break;
                    default:
                        return
                }
                   
                console.log('newVal, oldVal', newVal, oldVal)
            }
            
        }
    }
}
</script>


<style>
    .aside-menu{
        height: 80vh;
    }


  .el-header .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>