<template>
    <div class="main">
        <!-- <div class="header">
            header
        </div> -->

        <el-tabs v-model="activeName">
            <el-tab-pane label="发起审批" name="first">
                <div class="start-main">
                    <div class="start-left">
                        <div class="left-item" v-for="(item, index) in categoryList" :key="index" @click="switchQuickEntry(item)">
                            {{ item.procTypeName}}
                        </div>
                    </div>
                    <div class="start-right">
                        <!-- <el-row align="middle" type="flex" :gutter="20"> -->
                            <div v-for="item in quickEntryList" :key="item.id" class="right-item">
                                <div style="margin-left:10px">
                                   <!-- <i class="el-icon-s-opportunity" size="small"></i> -->
                                   <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                </div>
                                <!-- <el-avatar icon="el-icon-s-opportunity" size="small"></el-avatar> -->
                                <div style="margin-left:10px">
                                    {{item.procName}}
                                </div>
                            </div>
                            <!-- <el-col :span="8">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                测试
                            </el-col>
                            <el-col :span="8">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                测试
                            </el-col>
                            <el-col :span="8">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                测试
                            </el-col> -->
                        <!-- </el-row> -->
                        <!-- <el-row align="middle" type="flex" :gutter="20">
                            <el-col :span="8">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                测试
                            </el-col>
                            <el-col :span="8">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                测试
                            </el-col>
                        </el-row> -->
                    </div>
                </div>
                
            </el-tab-pane>
            <el-tab-pane label="审批中心" name="second">
                <div class="left">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="menuSelect">
                        <!-- <el-submenu index="1">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>待办</span>
                            </template>
                            <el-menu-item v-for="(item, index) in todoList" :key="index" @click="switchMenu(item,'todo')">
                                {{item.title}}
                                <el-badge :value="item.data.length" class="item"></el-badge>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>已办</span>
                            </template>
                            <el-menu-item v-for="(item, index) in todoList" :key="index" @click="switchMenu(item, 'done')">
                                {{item.title}}
                                <el-badge :value="item.data.length" class="item" type="primary"></el-badge>
                            </el-menu-item>
                        </el-submenu> -->
                        <el-menu-item index="todo">
                            <i class="el-icon-location"></i>
                            <span slot="title">待办</span>
                        </el-menu-item>
                        <el-menu-item index="done">
                            <i class="el-icon-menu"></i>
                            <span slot="title">已办</span>
                        </el-menu-item>
                        <el-menu-item index="copyMe">
                            <i class="el-icon-document"></i>
                            <span slot="title">抄送我的</span>
                        </el-menu-item>
                        <el-menu-item index="launch">
                            <i class="el-icon-setting"></i>
                            <span slot="title">我发起的</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <message-list :typeData="listData" :operateType="operateType" class="list-main" :categoryList="categoryList"></message-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import messageList from '@/components/messageList/index'
import { listMyProcModelPage } from '@/api/workflow/process';
import { listTodoProcess } from '@/api/workflow/task';
import { listCategory } from "@/api/workflow/category";

export default {
    components:{
        messageList,
    },
    data(){
        return{
            categoryList:[],    //流程分类列表
            queryParams:{
                current: 1,
                pageSize: 20,
                procTypeCode: '',
            },
            itemList:{
                personnelList:{
                    title: '人事',
                    data:[
                        {
                            id:'001',
                            title:'请假',
                        },
                        {
                            id:'002',
                            title:'加班',
                        },
                        {
                            id:'003',
                            title:'打卡',
                        },
                        {
                            id:'004',
                            title:'补卡',
                        },
                        {
                            id:'005',
                            title:'开通权限',
                        },
                        // {
                        //     id:'005',
                        //     title:'开通权限',
                        // },
                    ]
                },
                OAList:{
                    title: 'OA',
                    data:[
                        {
                            id:'001',
                            title:'合同申请',
                        },
                        {
                            id:'002',
                            title:'采购申请',
                        },
                    ]
                },
                marketList:{
                    title: '市场',
                    data:[
                        {
                            id:'001',
                            title:'投放预算',
                        },
                        {
                            id:'002',
                            title:'调研平台',
                        },
                    ]
                },
                
            },
            quickEntryList:[],  //快捷入口区域列表
            activeName: 'first',    //tab页初始显示
            operateType: 'todo',    //审批操作类型
            listData:'',  //传递给子组件数据
            todoList:{
                holidayList: {
                    title: '请假申请',
                    data:[
                        {
                            id:"001",
                            title:'资产采购申请',
                            name:"王一",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提111'
                        },
                        {
                            id:"002",
                            title:'资产采购申请',
                            name:"王一66",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提666666666'
                        },
                        {
                            id:"003",
                            title:'资产采购申请',
                            name:"王一003",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提666666666'
                        },
                    ]
                },
                assetsList: {
                    title: '资产管理',
                    data:[
                        {
                            id:"001",
                            title:'资产采购申请',
                            name:"王一2",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提22222222222'
                        },
                    ]
                },
                programList:{
                    title: '立项申请',
                    data:[
                        {
                            id:"001",
                            title:'资产采购申请',
                            name:"王一3",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提33333333333'
                        },
                        {
                            id:"002",
                            title:'资产采购申请',
                            name:"王一77",
                            dept:"研发部",
                            applyReason:'申请资产',
                            assets: '电子设备-笔记本-Mac',
                            applyTime: '2022-07-08 10:00:00',
                            takeWay:'自提777'
                        },
                    ]
                }
            },
            
        }
    },
    computed:{
        
    },
    created(){
        this.getCanLaunchProcess();
        this.getList();
    },
    methods:{
        menuSelect(index){
            console.log("当前选中菜单项", index)
            this.listData = index
        },
        getTodoList(){
            listTodoProcess(this.queryParams).then(response => {
                this.todoList = response.data.records;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        //获取流程分类列表
        getList(){
            console.log("获取分类列表信息")
            let param= {
                current: 1,
                pageSize: 20,
            }
            listCategory(param).then(response => {
                console.log("获取列表信息返回====", response)
                this.categoryList = response.data.records;
                // this.total = response.data.total;
            });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        switchMenu(value, type){
            this.operateType = type
            this.listData = value.data
            console.log("点击子菜单", this.operateType)
        },
        //切换快捷入口区域
        switchQuickEntry(value){
            console.log('快捷入口', value)
            this.queryParams.procTypeCode = value.procTypeCode
            listMyProcModelPage(this.queryParams).then(res => {
                console.log("我可以发起的流程记录", res)
                this.quickEntryList = res.data.records;
            })
            // this.quickEntryList = value.data;
        },
        // 获取我发起的流程
        getCanLaunchProcess(){
            listMyProcModelPage(this.queryParams).then(res => {
                console.log("我可以发起的流程记录", res)
            })
        },
    }
}
</script>

<style scoped lang="less">
.main{
    display: flex;
    .start-main{
        display: flex;
        .start-left{
            width: 250px;
            background: #FFF;
            height: 70vh;
            overflow: auto;
            border-right: 1px solid gainsboro;
            .left-item{
                // background: #FFF5EE;
                height: 50px;
                margin: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 5px;
            }
            .left-item:hover{
                background: #F0FFFF;
            }
        }
        .start-right{
            display: flex;
            flex: 1;
            // width: 50vw;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            // white-space: nowrap;
            .right-item{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 10px;
                height: 50px;
                background: #FFF;
                border: 1px solid lightgray;
                border-radius: 5px;
                // box-sizing: border-box;
                width: 30%;
                height: 60px;
            }
        }
    }
    .header{
        position: absolute;
        top: 0;
        width: 100%;
        // background: pink;
        padding-bottom: 10px;
    }
    .left{
        text-align: left;
        width: 300px;
        background: #FFF;
        height: 70vh;
        overflow: auto;
        // border: 1px solid black;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        
    }
    
    .list-main{
        flex:1
    }
    .el-tabs--top{
        flex: 1;
    }
}
// .el-tabs el-tabs--top{
//     flex: 1;
// }

.el-tabs__content #pane-second{
    display: flex;
}
// .el-tabs__content .el-tab-pane{
//     overflow: scroll;
//     max-height: 80vh;
// }
</style>