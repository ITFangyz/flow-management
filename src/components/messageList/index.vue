<template>
    <div class="main">
        
        <div class="center" v-infinite-scroll="loadDataList">
            <div class="header">
                <div>时间排序</div>
                <div class="showType">
                    <i class="el-icon-more" @click="switchShowType('breif')"></i>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-s-grid" @click="switchShowType('detail')"></i>
                </div>
            </div>
            <div v-if="listData.length == 0" style="text-align:center">
                暂无数据
            </div>
            <div class="list" v-show="showType == 'detail' && listData.length !== 0">
                <div class="list-item" v-for="item in listData" :key="item.id" shadow="always"  @click="toDetail(item)">
                    <el-row>
                        <el-col :span="18"><div class="point-title">{{item.procName}}</div></el-col>
                    </el-row>
                    <el-row align="middle" type="flex">
                        <el-col :span="6"><el-avatar icon="el-icon-user-solid" size="small"></el-avatar></el-col>
                        <el-col :span="6"><div class="point-title">{{item.handlerName}}</div></el-col>
                        <el-col :span="12"><div class="usual">{{item.dept}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><div class="usual">申请理由</div></el-col>
                        <el-col :span="16"><div class="point-title">{{item.innerProcDefId}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><div class="usual">资产名称</div></el-col>
                        <el-col :span="16"><div class="point-title">{{item.procNo}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><div class="usual">{{item.crtTime}}</div></el-col>
                    </el-row>
                </div>
            </div>
            <div class="list" v-show="showType == 'breif'">
                <div class="list-item-simple" v-for="item in listData" :key="item.id" shadow="always"  @click="toDetail(item)">
                    <el-row align="middle" type="flex">
                        <el-col :span="4"><el-avatar icon="el-icon-user-solid" size="small"></el-avatar></el-col>
                        <!-- <el-col :span="8"><span class="point-title">{{item.name}}</span></el-col> -->
                        <el-col :span="20"><span class="point-title">{{item.procName}}</span></el-col>
                    </el-row>
                    <!-- <div style="flex:1"><el-avatar icon="el-icon-user-solid"></el-avatar></div>
                    <div style="flex:2"><span class="point-title">{{item.name}}</span></div>
                    <div style="flex:3"><span class="point-title">{{item.title}}</span></div> -->
                </div>
            </div>
        </div>
        <div class="infoPart">
            <message-detail :messageInfo="messageInfo" v-if="messageInfo" :operateType="operateType"></message-detail>
        </div>
    </div>
</template>

<script>
import messageDetail from '@/components/messageDetail/index'
import { listTodoProcess, listFinishedProcess, listCopyProcess } from '@/api/workflow/task';
import { listOwnProcess } from '@/api/workflow/process';

export default {
    props:{
        typeData: {
            // type: Array,
            required: false
        },
        operateType:{
            type: String,
            required: true
        }
    },
    components:{
        messageDetail,
    },
    data(){
        return{
            queryParams:{
                current: 1,
                pageSize: 10
            },
            listData:[],
            showType:"detail",
            messageInfo:null,
        }
    },
    created(){
        console.log("listData    created===========", this.typeData)
        if( this.typeData == 'todo'){
            listTodoProcess(this.queryParams).then(response => {
                this.listData = response.data.records;
                this.total = response.data.total;
                this.loading = false;
            });
        } else if(this.typeData == 'done'){
            listFinishedProcess(this.queryParams).then(response => {
                this.listData = response.data.records;
                this.total = response.data.total;
                this.loading = false;
            });
        } else if(this.typeData == 'copyMe'){
            listCopyProcess(this.queryParams).then(response => {
                this.listData = response.data.records;
                this.total = response.data.total;
                this.loading = false;
            });
        } else if(this.typeData == 'launch'){
            listOwnProcess(this.queryParams).then(response => {
                console.log("获取我的流程记录", response)
                this.listData = response.data.records;
                this.total = response.data.total;
                this.loading = false;
            });
        }
    },
    methods:{
        loadDataList(){
            
        },
        toDetail(value){
            console.log("显示详情", value)
            this.messageInfo = value
        },
        switchShowType(value){
            this.showType = value
        }
    },
    watch:{
        // listData(){
        //    
        // },
        // deep:true
    }
}
</script>

<style scoped lang="less">
.main{
    display: flex;
    .center{
        width: 300px;
        background: #F5F5F5;
        height: 70vh;
        overflow: auto;
        // border-right: 1px solid black;
        // border-top: 1px solid black;
        // border-bottom: 1px solid black;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /* border-radius: 10px; */
        /* min-height: 600px; */
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
        }
        .showType{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
    .list{
        margin: 10px;
        .list-item{
            text-align: left;
            margin-top: 10px;
            border-radius: 4px;
            border: 1px solid #e6ebf5;
            background-color: #FFFFFF;
            overflow: hidden;
            color: #303133;
            /* -webkit-transition: 0.3s; */
            transition: 1s;
            padding: 5px;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        }
        .list-item-simple{
            margin-top: 10px;
            border-radius: 4px;
            border: 1px solid #e6ebf5;
            background-color: #FFFFFF;
            overflow: hidden;
            color: #303133;
            transition: 1s;
            padding: 5px;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        }
        .usual{
            font-size: 10px;
            color: Grey;
        }
        .point-title{
            font-size: 14px;
            color: black;
            font-weight: 600;
        }
    }
    .infoPart{
        flex: 1;
        overflow: auto;
        max-height: 70vh;
    }
}
</style>