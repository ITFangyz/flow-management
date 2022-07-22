<template>
    <el-container>
        <!-- <build-form :form-conf="formConf" showType="view"></build-form> -->

        <el-tabs v-model="activeIndex"  tab-position="top">
            <!-- <el-tab-pane label="表单信息" name="1">
                <build-form :form-conf="formConf" showType="view"></build-form>
            </el-tab-pane> -->
            <el-tab-pane label="表单信息" name="form">
                <el-card class="box-card" shadow="never">
                    <!--流程处理表单模块-->
                    <el-col :span="20" :offset="2">
                        <div>
                        <!-- <parser :key="new Date().getTime()" :form-conf="variablesData"/> -->
                        <!-- <build-form :form-conf="variablesData" :form-info="formInfo" showType="view" disabled="true"></build-form> -->
                        <build-form :form-conf="formConf" showType="view"></build-form>
                        </div>
                    </el-col>
                </el-card>
            </el-tab-pane >

            <el-tab-pane label="流转记录" name="2">
                22222
            </el-tab-pane>
            <el-tab-pane label="流程跟踪" name="3">
                333
            </el-tab-pane>

            
        </el-tabs>

        <!-- <div class="showMain">
            <div v-show="activeIndex == 1">

            </div>
            <div v-show="activeIndex == 2">

            </div>
            <div v-show="activeIndex == 3">

            </div>
        </div> -->
    </el-container>
</template>

<script>
import BuildForm from "@/components/buildForm/index.vue";
import { listProcess, processDetail, readProcessXml } from '@/api/workflow/bpmProcDef';

export default {
    components:{
        // approveList,
        BuildForm,
    },
    // props:{
    //     formConf
    // },
    data(){
        return{
            Msg:'首页',
            activeIndex: '1',
            processId: '',
            // id:"1545663400966549505",
            formConf: {},           //表单信息
        }
    },
    methods: {
      
    },
    created(){
        console.log("路由====", this.$route.query.processId)
        this.processId = this.$route.query.processId
        if(this.processId){
            processDetail(this.processId).then(response => {
                console.log("流程详情 response", response)
                this.formConf = JSON.parse(response.data.flowableForm.formJson)
                // console.log("formConf======", this.formConf)
            })
        }
        // this.toApprove()
        
    },
    watch:{
        activeIndex:{
            immediate:true,
            handler(newVal, oldVal){
                console.log('newVal, oldVal', newVal, oldVal)
            }
            
        }
    }
}
</script>


<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}

.el-tabs{
    flex: 1;
}

.ant-form-item-control{
    text-align: left;
}
</style>