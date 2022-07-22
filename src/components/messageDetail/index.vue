<template>
    <div class="detail">
        <el-row>
            <el-col :span="12">审批详情</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="6"><span class="labelContent">{{messageInfo.name}}  {{messageInfo.title}}</span></el-col>
            <el-col :span="2"><el-tag type="danger" effect="dark">审批中</el-tag></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelTitle">{{messageInfo.dept}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="detailItem">
            <el-col :span="12"><span class="labelTitle">申请编号</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelContent">{{messageInfo.id}}</span></el-col>
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
            <el-col :span="12"><span class="labelTitle">提取方式</span></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><span class="labelContent">{{messageInfo.takeWay}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="12"><div>流程详细</div></el-col>
        </el-row>
        <el-divider v-if="operateType == 'todo'"></el-divider>
        <el-row :gutter="10" v-if="operateType == 'todo'">
            <el-col :span="3" :offset="6"><el-button type="primary">通过</el-button></el-col>
            <el-col :span="3"><el-button type="success">转办</el-button></el-col>
            <el-col :span="3"><el-button type="warning">退回</el-button></el-col>
            <el-col :span="3"><el-button type="danger">拒绝</el-button></el-col>
        </el-row>
    </div>
</template>

<script>
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
    computed:{

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