<template>
  <div class="app-container">
    <!-- <dept-Select></dept-Select> -->
    <!-- <button @click="getJobs">查询岗位</button> -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="deployTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.deployTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->
    <el-table v-loading="loading" fit :data="processList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="流程标识" align="center" prop="id" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="流程状态" align="center" prop="procStatus" :show-overflow-tooltip="true" :formatter="statusFormat"/> -->
      <el-table-column label="流程名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button type="text" @click="handleProcessView(scope.row)">
            <span>{{ scope.row.procName }}</span>
          </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="流程分类" align="center" prop="categoryName" :formatter="categoryFormat" />
      <el-table-column label="流程版本" align="center">
        <template slot-scope="scope">
          <el-tag size="medium" >v{{ scope.row.version }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="!scope.row.procStatus" @click="alterStatus(scope.row, 1)">禁用</el-tag>
          <el-tag type="success" v-if="scope.row.procStatus" @click="alterStatus(scope.row, 0)">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="crtTime" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-video-play"
            @click="handleStart(scope.row)"
          >发起</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-info"
            @click="handleDetail(scope.row)"
          >流程详情</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 流程图 -->
    <el-dialog :title="processView.title" :visible.sync="processView.open" width="70%" append-to-body>
      <process-viewer :key="`designer-${processView.index}`" :xml="processView.xmlData" :style="{height: '400px'}" />
    </el-dialog>

    <!-- 表单 -->
    <el-dialog :visible.sync="formVisible" width="70%" append-to-body>
      <build-form :form-conf="formConf" showType="alter" @submit="submitForm"></build-form>
      <!-- <div>
        <el-button @click="submitForm">确定</el-button>
      </div> -->
    </el-dialog>

    <job-select v-if="dialogTableVisible" @getSelected="getSelected"></job-select>
    <!-- <userSelect v-if="dialogTableVisible" @getSelected="getSelected"></userSelect> -->
    <!-- <el-dialog title="岗位信息" :visible.sync="dialogTableVisible">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="jobLists" @current-change="handleCurrentChange" highlight-current-row>
        <el-table-column  width="80" type="index"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="departmentName" label="部门名称" width="200"></el-table-column>
        <el-table-column property="id" label="部门id"></el-table-column>
      </el-table>
      <div class="bottomPart">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <div class="bottomPart">
        <el-button v-show="currentRow" type="primary">确定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>

import { listProcess, processDetail, readProcessXml, processDel, updateProcessStatus } from '@/api/workflow/bpmProcDef';
import { startProcess } from '@/api/workflow/process';
import { listJobs } from '@/api/workflow/user'
// import { readXml } from '@/api/workflow/definition'
import ProcessViewer from '@/components/ProcessViewer'
import deptSelect from '@/components/DepartmentCascader'
import jobSelect from '@/components/jobSelect'
import userSelect from '@/components/userSelect'
import BuildForm from "@/components/buildForm/index.vue";

export default {
  name: 'WorkProcess',
  components: {
    ProcessViewer,
    deptSelect,
    jobSelect,
    userSelect,
    BuildForm
},
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 查询参数
      queryParams: {
        current: 1,
        pageSize: 10,
      },
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      filterCategoryText: '',
      categoryOptions: [],
      categoryProps: {
        label: 'categoryName',
        value: 'code'
      },
      // 流程定义表格数据
      processList: [],
      processView: {
        title: '',
        open: false,
        index: undefined,
        xmlData:"",
      },
      formConf:{},  //表单详细信息
      formVisible: false, //表单是否可见
      dialogTableVisible: false, //表单信息展示
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      currentRow: null,
      jobLists: [],
      startFlowId: '',  //发起流程ID
    }
  },
  created() {
    // this.getCategoryList();

    this.getList();
  },
  methods: {
    //组件返回选中项信息
    getSelected(info){
      this.dialogTableVisible = false
      console.log("组件返回", info)
    },
    //处理选中项
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("选中项信息", this.currentRow)
    },
    
    //获取岗位列表
    getJobs(){
      this.dialogTableVisible = true
      // let param = {
      //   current: 1,
      //   pageSize: 10
      // }
      // console.log("查询岗位参数", param)
      // listJobs(param).then(res => {
      //   this.jobLists = res.data.records;
      //   console.log("获取岗位列表", res)
      // })
    },
    //修改流程状态
    alterStatus(row, type){
      let param = {
        id: Number(row.id),
        procStatus: type
      }
      updateProcessStatus(param).then(res => {
        consoler.log("修改流程状态返回", res)
      })
    },
    /** 查询流程分类列表 */
    getCategoryList() {
      listCategory().then(response => this.categoryOptions = response.rows)
    },
    /** 查询流程定义列表 */
    getList() {
      listProcess(this.queryParams).then(response => {
        console.log("查询流程定义列表 ", response)
        this.processList = response.data.records;
        this.total = response.data.total;
        this.loading = false
      })
    },
    // 搜索按钮操作
    handleQuery() {
      this.queryParams.current = 1;
      this.getList();
    },
    // 重置按钮操作
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 查看流程图 */
    handleProcessView(row) {
      console.log("row流程信息", row)

      let definitionId = row.id;
      this.processView.title = "流程图";
      this.processView.index = definitionId;
      // 发送请求，获取xml
      readProcessXml(definitionId).then(res => {
        console.log("流程详情res", res)
        this.processView.xmlData = res.data;
      })
      this.processView.open = true;
    },
    handleStart(row) {
      console.log("点击发起流程", row)
      this.formVisible = true
      this.startFlowId = row.id
      // let param = {
      //   innerProcDefId:"1550671820656357377",
      //   startForm:{}
      // }
      processDetail(row.id).then(response => {
        console.log("流程详情 response", response)
        this.formConf = JSON.parse(response.data.flowableForm.formJson)
      })
      // param.startForm = this.formConf
      
      
    },
    submitForm(data){
      this.formVisible = false
      console.log("表单组件接受参数", data)
      let param = {
        innerProcDefId:this.startFlowId,
        startForm:data
      }
      console.log("流程发起参数", param)
      startProcess(param).then(res => {
        console.log("发起流程返回", res)
        this.startFlowId = ''
        this.$message.success("发起成功");
      })
    },

    //查看流程详情
    handleDetail(row){
      console.log("查看流程详情", row)
      processDetail(row.id).then(response => {
        console.log("流程详情 response", response)
        this.$router.push({
          path: '/flow',
          // path: '/processDetail',
          query: {
            processId: row.id,
            bpmXml: response.data.bpmXml,
            procName: response.data.procName,
            procRemark: response.data.procRemark,
            procTypeId: response.data.procTypeId,
          }
        })
        // this.formConf = JSON.parse(response.da ta.flowableForm.formJson)
      })

      // readProcessXml(row.id).then(response => {
      //   console.log("流程xml response", response)
      // })
    },
    // 删除流程
    handleDelete(row){
      let param = row.id
      this.$modal.confirm(`是否确认删除名称为"` + row.procName + '"的数据项？').then(() => {
        // this.loading = true;
        processDel(param).then(res => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(res => {
          this.$message.error(res.mseeage);
        })
      }).catch(res => {
        
      })
      // .then(() => {
      //   // this.loading = false;
      //   this.getList();
      //   this.msgSuccess("删除成功");
      // }).catch(res => {
      //   console.log(res.mseeage)
      //   this.$message.error(res.mseeage);
      // })


      // processDel(param).then(res => {
      //   this.$message.success("删除成功");
      //   this.getList();
      // })
      // .catch(res => {
      //   console.log(res.mseeage)
      //   this.$message.error(res.mseeage);
      // })
    },
    handleSelectionChange(selection){
      console.log("选中行信息", selection)
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    categoryFormat(row, column) {
      return this.categoryOptions.find(k => k.code === row.category)?.categoryName ?? '';
    },
    statusFormat(row, column){
      // console.log("格式化", row , column)
      return row.categoryName == '0'?'禁用':'启用';
    }
  }
}
</script>

<style scoped>
.bottomPart{
  margin-top: 20px;
  text-align: right;
}
</style>
