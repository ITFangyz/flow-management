<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="流程名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入流程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流程编号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入流程编号"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> 
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="ownProcessList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="流程编号" align="center" prop="id" :show-overflow-tooltip="true"/>
      <el-table-column label="流程名称" align="center" prop="title" :show-overflow-tooltip="true"/>
      <el-table-column label="流程类别" align="center" prop="procTypeId" :formatter="categoryFormat" />
      <!-- <el-table-column label="流程版本" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag size="medium" >v{{ scope.row.procDefVersion }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="提交时间" align="center" prop="crtTime" width="180"/>
      <el-table-column label="流程状态" align="center" width="100">
        <template slot-scope="scope">
          <!-- <el-tag v-if="scope.row.finishTime == null" size="mini">进行中</el-tag> -->
          <el-tag v-if="scope.row.procStatus == 1" size="mini">审批中</el-tag>
          <el-tag type="success" v-if="scope.row.procStatus == 2" size="mini">已完成</el-tag>
          <el-tag type="danger" v-if="scope.row.procStatus == 3" size="mini">已拒绝</el-tag>
          <el-tag type="warning" v-if="scope.row.procStatus == 4  " size="mini">已撤销</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="耗时" align="center" prop="duration" width="180"/>
      <el-table-column label="当前节点" align="center" prop="taskName"/>
      <el-table-column label="办理" align="center">
        <template slot-scope="scope">
          <label v-if="scope.row.assigneeName">{{scope.row.assigneeName}} <el-tag type="info" size="mini">{{scope.row.deptName}}</el-tag></label>
          <label v-if="scope.row.candidate">{{scope.row.candidate}}</label>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-tickets" @click.native="handleFlowRecord(scope.row)" >流程详情</el-button>
          <el-button type="text" size="mini" icon="el-icon-circle-close" @click.native="handleStop(scope.row)">取消申请</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click.native="handleDelete(scope.row)" >删除流程</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listOwnProcess } from '@/api/workflow/process';
// import { listOwnProcess, stopProcess, delProcess } from '@/api/workflow/process';
import { listCategory } from '@/api/workflow/category';
export default {
  name: "Own",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      processLoading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      categoryOptions: [],
      processTotal:0,
      // 我发起的流程列表数据
      ownProcessList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      src: "",
      definitionList:[],
      // 查询参数
      queryParams: {
        current: 1,
        pageSize: 10,
        title: null,
        id: null,
        // category: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
    };
  },
  created() {
    this.getCategoryList();
    this.getList();
  },
  methods: {
    /** 查询流程分类列表 */
    getCategoryList() {
      listCategory(this.queryParams).then(response => this.categoryOptions = response.data.records)
    },
    /** 查询流程定义列表 */
    getList() {
      this.loading = true;
      listOwnProcess(this.queryParams).then(response => {
        console.log("获取我的流程记录", response)
        this.ownProcessList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        category: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.current = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /**  取消流程申请 */
    handleStop(row){
      const params = {
        instanceId: row.procInsId
      }
      // stopProcess(params).then( res => {
      //   this.msgSuccess(res.msg);
      //   this.getList();
      // });
    },
    /** 流程流转记录 */
    handleFlowRecord(row) {
      console.log("row =========> ", row)
      this.$router.push({ path: '/work/detail',
        query: {
          definitionId: row.procDefId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          finished: false
        }})
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.procInsId;
      this.$confirm('是否确认删除流程定义编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        // return delProcess(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    categoryFormat(row, column) {
      console.log("类别格式化", row )

      return this.categoryOptions.find(k => k.id === row.procTypeId)?.procTypeName ?? '';

      // let val = '';
      // this.categoryOptions.forEach((item,index) => {
      //   console.log("item====", item)
      //   if(item.id == row.procTypeId){
      //     val = item.procTypeName
      //     return
      //   }
      // })

      // return val
      // return this.categoryOptions.forEach((item,index) => {
      //   console.log("item====", item)
      //   if(item.id == row.procTypeId){
      //     return item.id == row.procTypeId? item.procTypeName : ''
      //   }
      // })


       val = this.categoryOptions.some((item,index) => {
        // console.log("item====", item)
        // if(item.id == row.procTypeId){
        //   val = item.procTypeName
          
        // }

        return item.id == row.procTypeId
      })
      console.log("val ====", val)

    }
  }
};
</script>
