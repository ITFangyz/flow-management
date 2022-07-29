<template>
  <div class="workflow-designer">
    <el-container>
      <el-header height="70px">
        <el-row type="flex" align="middle">
          <el-col :span="3">
            <div style="display:flex;justify-content:center;">
              <el-button type="danger" @click="onClose()">关闭</el-button>
              <el-button type="primary" @click="onPrevious()" :disabled="activeStep <= 0">上一步</el-button>
            </div>
          </el-col>
          <el-col :offset="1" :span="16">
            <el-steps :active="activeStep" finish-status="success" align-center>
              <el-step title="基础设置"></el-step>
              <el-step title="表单设计"></el-step>
              <el-step title="流程设计"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
          <el-col :offset="1" :span="3">
            <div style="display:flex;justify-content:center;">
              <el-button type="primary" @click="onNext()" :disabled="activeStep >= 2">下一步</el-button>
              <el-button type="success" @click="onSave()" :disabled="activeStep !== 2">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="app-container-one" v-show="activeStep === 0">
          <el-form size="small" label-width="100px" :rules="rules" :model="designerForm" ref="baseForm" :label-position="labelPosition">
            <el-form-item label="流程名称" prop="processName">
              <el-col :span="22">
                <el-input v-model="designerForm.processName" clearable />
              </el-col>
            </el-form-item>
            <el-form-item label="流程分类" prop="category">
              <el-col :span="22">
                <el-select v-model="designerForm.category" placeholder="请选择" clearable style="width:100%">
                  <el-option v-for="item in categoryOptions" :key="item.id" :label="item.procTypeName" :value="item.id" />
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="备注" prop="procRemark">
              <el-col :span="22">
                <!-- <el-input v-model="designerForm.procRemark" clearable /> -->
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入备注"
                  v-model="designerForm.procRemark">
                </el-input>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="流程图标" prop="formIcon">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-success="successIcon"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item> -->
          </el-form>
        </div>
        <div v-show="activeStep === 1" class="app-container-two">
          <k-form-design 
            :toolbars="['save', 'preview', 'importJson', 'exportJson', 'exportCode']"
            toolbarsTop
            ref='kfd'
            @save="handleSave"
            title="表单设计器"
          />
        </div>
        <div v-show="activeStep === 2" class="app-container-three">
          <process-designer
            ref="modelDesigner"
            v-loading="loading"
            :key="`designer-${loadIndex}`"
            :bpmnXml="bpmnXml"
            :designerForm="designerForm"
          />
        </div>
        <div v-show="activeStep === 3">
          <el-result :icon="result.icon" :title="result.title" :subTitle="result.describe">
            <template slot="extra">
              <el-button type="primary" size="medium" @click="onClose()">关闭</el-button>
            </template>
          </el-result>
        </div>

      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
import { readXml, saveXml } from "@/api/workflow/definition";
import ProcessDesigner from '@/components/ProcessDesigner';
import { listProcess, processDetail, readProcessXml, processUpdate, readProcessImg } from '@/api/workflow/bpmProcDef';
import { listCategory } from '@/api/workflow/category';

export default {
  name: 'Designer',
  components: { ProcessDesigner },
  props: {
    // designerForm: {
    //   type: Object,
    //   required: false
    // }
  },
  data () {
    return {
      labelPosition: 'left',  //表单排列方向
      dialogImageUrl: '', //上传图标url
      dialogVisible: false, //弹窗是否可见
      designerForm:{},
      activeStep: 0,
      basicInfoForm: {},
      categoryOptions: [],
      loadIndex: 0,
      loading: false,
      bpmnXml: '',
      result: {
        icon: 'info',
        title: null,
        describe: null
      },
      rules:{
        // processName: [
        //   { required: true, message: "流程名称不能为空", trigger: "blur" }
        // ],
        // category: [
        //   { required: true, message: "流程分类不能为空", trigger: "blur" }
        // ],
        // procRemark: [
        //   { required: true, message: "备注不能为空", trigger: "blur" }
        // ],
      },
      dto:{}, //流程数据
      flowableForm:{},  //表单数据
      flowId: '', //流程ID
      formId: '', //表单ID
    };
  },
  created() {
    this.getCategoryList();
    console.log("this.$route.query", this.$route.query)
    if (this.$route.query.processId) {
      //流程数据通过路由传参
      this.bpmnXml = this.$route.query.bpmXml
      this.designerForm.processName = this.$route.query.procName
      this.designerForm.category = this.$route.query.procTypeId
      this.designerForm.procRemark = this.$route.query.procRemark

      processDetail(this.$route.query.processId).then(res => {
        console.log("流程详情++++", res)
        // this.designerForm.processName = res.data.procName
        // this.designerForm.category = res.data.procTypeId
        // this.designerForm.procRemark = res.data.procRemark
        this.flowId = res.data.id
        this.formId = res.data.formId

        this.designerForm.processId = res.data.id
        console.log("this.designerForm", this.designerForm)

        //表单数据
        this.$refs.kfd.handleSetData(JSON.parse(res.data.flowableForm.formJson))
        //流程数据
        // this.bpmnXml = res.data.bpmXml

        // 读取流程进度图片
        // let param = this.designerForm.processId
        // readProcessImg(param).then(res => {
        //   console.log("读取流程图片", res)
        // })
      })
    }
    

    

    // console.log("this.bpmnXml", this.bpmnXml)

    // if (this.designerForm.definitionId) {
    //   this.getModelDetail(this.designerForm.definitionId)
    // }
  },
  methods: {
    sendRequest(){
      let dto = {
        	// "bpmXml": "",
          // "current": 0,
          // "flowableForm": {
          //   "formJson": "",
          //   "formName": "",
          //   "formStatus": 0
          // },
          // "formId": 0,
          // "icon": "",
          // "id": 0,
          // "pageSize": 0,
          // "procAdmins": [],
          // "procDefId": "",
          // "procDepId": "",
          // "procKey": "",
          // "procName": "",
          // "procRemark": "",
          // "procStatus": 0,
          // "procTypeId": 0,
          // "scopes": [
          //   {
          //     "crtId": 0,
          //     "crtName": "",
          //     "crtTime": "",
          //     "innerProcDefId": 0,
          //     "relationId": 0,
          //     "relationType": 0
          //   }
          // ],
          // "sort": 0
      }
      listProcess(dto).then((res) => {
        console.log("请求返回", res)
      })
    },
    onClose () {
      // this.$emit('close');

      // this.$router.push({
      //   path: '/process',
      // })
      if (this.$route.query.processId){
        this.$router.push({
          path: '/process',
        })
      }
      // this.$router.go(-1)
    },
    onPrevious() {
      this.activeStep--;
    },
    onNext() {
      //表单校验
      switch(this.activeStep){
        case 0 :
          this.$refs["baseForm"].validate((valid) => {
            if (valid) {
              console.log(this.designerForm.category , "procName", this.designerForm.processName)
              this.activeStep++;
            }
          });
          break;
        case 1 :
          let formdata = this.$refs.kfd.getValue()
          console.log("表单数据", formdata)
          this.flowableForm.formJson = JSON.stringify(formdata)
          this.flowableForm.formName = "测试表单"
          this.flowableForm.formStatus = 1
          // if(formdata.list.length == 0){
          //   this.$message({
          //     showClose: true,
          //     message: '请先完成表单配置',
          //     type: 'warning'
          //   });
          // } else{
          //   this.activeStep++;
          // } 
          this.activeStep++;
          break;
        case 2 :
          console.log("当前表单信息", this.bpmnXml)
          console.log("新增流程")
          
          // readProcessXml(this.$route.query.processId).then(res => {
          //   console.log("流程详情res", res)
          //   this.bpmnXml = res.data;
          // })
          break;
      }

      
      // this.activeStep++;
    },
    onSave() {
      let refProcessDesigner = this.$refs.modelDesigner.$refs.processDesigner;
      refProcessDesigner.onSave().then(xml => {
        
        this.bpmnXml = xml;
        // console.log("保存时流程数据", this.bpmnXml)

        this.dto.bpmXml = this.bpmnXml
        this.dto.procName = this.designerForm.processName
        this.dto.procRemark = this.designerForm.procRemark
        this.dto.procStatus = '1'
        this.dto.procTypeId = this.designerForm.category
        // this.dto.procTypeId = '1542305287642791937'   //暂时写死

        this.dto.flowableForm = this.flowableForm
        this.dto.scopes = [
          {
            relationId: 0,    // 关联Id
            relationType: 4   // 1=岗位,2=部门,3=用户,4=全部
          }
        ]

        console.log("新增或修改流程设计param", this.dto)
        if(!this.$route.query.processId){
          saveXml(this.dto).then(res => {
            console.log("新增流程成功res", res)
            this.result.icon = 'success';
            this.result.title = '成功';
            this.result.describe = res.msg;

            this.$message.success("新增成功");
            // this.router.push({ 
            //   path: '/process'
            // })
            this.$router.push('/process')
          }).catch(res => {
            this.result.icon = 'error';
            this.result.title = '失败';
            this.result.describe = res.msg;
          }).finally(() => {
            this.onNext();
            this.$emit('save');
          })
        } else{
          let params = this.dto
          params.id = this.flowId
          params.formId = this.formId
          params.flowableForm.id = this.formId
          processUpdate(params).then( res => {
            console.log("流程修改成功", res)
            this.$message.success("修改成功");
            // this.$router.push('/process')
          })
        }
      })
      
      
    },
    /** 查询流程分类列表 */
    getCategoryList() {
      listCategory({pageNum: 1,pageSize: 10})
        .then(response => {
          console.log("流程分类返回", response)
          this.categoryOptions = response.data.records
        })
    },
    /** xml 文件 */
    getModelDetail(definitionId) {
      console.log("getModelDetail", definitionId)
      // this.loading = true;
      // 发送请求，获取xml
      // readXml(definitionId).then(res => {
      //   this.bpmnXml = res.data;
      //   this.loadIndex = definitionId;
      //   this.loading = false;
      // })
    },
    saveProcess(xml) {
      console.log("saveProcess", xml)
      // this.bpmnXml = xml;
      // saveXml({
      //   name: this.designerForm.processName,
      //   category: this.designerForm.category,
      //   xml: this.bpmnXml
      // }).then(res => {
      //   this.$message(res.msg)
      //   this.$emit('save');
      // })
    },
    handleSave(){
      console.log("点击了保存")
    },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
      console.log("this.dialogImageUrl", this.dialogImageUrl);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("this.dialogImageUrl=====", this.dialogImageUrl);
    },
    successIcon(){
      console.log("上传成功")
    }
  }
}
</script>

<style scoped>
.workflow-designer {
  /* position: fixed; */
  width: 100vw;
  height: 100vh;
  background: #ebeef5;
  top: 0;
  left: 0;
  z-index: 1010;
  /* padding: 10px; */
}
.workflow-designer >>> .el-header {
  padding: 10px;
  background: #ffffff;
  margin-bottom: 5px;
}

.workflow-designer >>> .el-main {
  background: #ffffff;
  padding: 0;
}

.app-container-one{
  padding: 20px;
  display:flex;
  justify-content:center;
}

.app-container-two{
  margin-top: -65px;
  height: 90vh;
}
.app-container-three{
  text-align: left;
  line-height: 40px;
}
</style>
