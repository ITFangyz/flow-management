<template>
    <div class="detail">
        <el-row>
            <el-col :span="12">审批详情</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="6"><span class="labelContent">{{messageInfo.sponsorName}}  {{messageInfo.procName}}</span></el-col>
            <el-col :span="2">
                <el-tag effect="dark" v-if="messageInfo.procStatus == 1">审批中</el-tag>
                <el-tag type="success" effect="dark" v-if="messageInfo.procStatus == 2">已完成</el-tag>
                <el-tag type="danger" effect="dark" v-if="messageInfo.procStatus == 3">已拒绝</el-tag>
                <el-tag type="danger" effect="dark" v-if="messageInfo.procStatus == 4">已撤销</el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelTitle">{{messageInfo.dept}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="detailItem">
            <el-col :span="12"><span class="labelTitle">申请编号</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelContent">{{messageInfo.procNo}}</span></el-col>
        </el-row>
        <el-row class="detailItem">
            <el-col :span="12"><span class="labelTitle">申请理由</span></el-col>
        </el-row>
            <el-row>
                <el-col :span="12"><span class="labelContent">{{messageInfo.applyReason}}</span></el-col>
            </el-row>
        <el-row class="detailItem">
            <el-col :span="12"><span class="labelTitle">资产名称</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelContent">{{messageInfo.assets}}</span></el-col>
        </el-row>
        <el-row class="detailItem">
            <el-col :span="12"><span class="labelTitle">创建时间</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelContent">{{messageInfo.crtTime}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="12"><div>流程详细</div></el-col>
        </el-row>
        <el-divider v-if="operateType == 'todo'"></el-divider>
        <el-row :gutter="10" v-if="operateType == 'todo'">
            <el-col :span="3" :offset="6"><el-button type="primary" @click="toDeal(messageInfo)">通过</el-button></el-col>
            <el-col :span="3"><el-button type="success" @click="toDeal(messageInfo)">转办</el-button></el-col>
            <el-col :span="3"><el-button type="danger" @click="toDeal(messageInfo)">驳回</el-button></el-col>
            <!-- <el-col :span="3"><el-button type="danger" @click="toDeal(messageInfo)">拒绝</el-button></el-col> -->
        </el-row>
    </div>
</template>

<script>
import { getFlowTaskInfoList } from '@/api/workflow/process';


export default {
    props:{
        messageInfo:{
            type: Object,
            required: false
        },
        operateType:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            detailInfo:{}
        }
    },
    created(){
        console.log("detail  created====", this.messageInfo.innerProcDefId)
    },
    watch:{
        messageInfo:{
            immediate:true,
            deep:true,
            handler(newVal, oldVal){
                console.log("messageInfo change", newVal)
                // let param = Number(newVal.innerProcDefId)
                let param = {
                    innerProcDefId: newVal.innerProcDefId,
                    procInstId: newVal.procInstId,
                }
                // let param = Number(newVal.id)
                console.log("请求详情参数param", param, typeof(param))
                getFlowTaskInfoList(param).then(res => {
                    console.log("获取流程详情====", res)
                })
            }
        }
    },
    methods:{
        toDeal(data){
            console.log("跳转到处理", data)
            // this.$router.push({
            //     path: '/detail',
            //     query: {
            //         definitionId: data.procNo,
            //         procInsId: data.procInstId,
            //         deployId: data.procNo,
            //         taskId: data.taskRecordId,
            //         innerProcDefId: data.innerProcDefId,
            //         finished: true
            //     }
            // })
        },
    }
}
</script>

<style scoped>
.detail{
    padding:20px;
    text-align: left;
}
.labelTitle{
    font-size: 12px;
    color: Grey;
}
.labelContent{
    font-size: 16px;
    color: black;
    font-weight: 500;
}
.detailItem{
    margin-top: 10px;
}
</style>