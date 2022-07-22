<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分类名称" prop="procTypeName">
        <el-input
          v-model="queryParams.procTypeName"
          placeholder="请输入分类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类编码" prop="procTypeCode">
        <el-input
          v-model="queryParams.procTypeCode"
          placeholder="请输入分类编码"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
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
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="分类编号" align="center" prop="id" v-if="true"/>
      <el-table-column label="分类名称" align="center" prop="procTypeName" />
      <el-table-column label="分类编码" align="center" prop="procTypeCode" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="!scope.row.typeStatus">禁用</el-tag>
          <el-tag type="success" v-if="scope.row.typeStatus">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="procTypeName">
          <el-input v-model="form.procTypeName" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类编码" prop="procTypeCode">
          <el-input v-model="form.procTypeCode" placeholder="请输入分类编码" />
        </el-form-item>
        <el-form-item label="状态" prop="typeStatus"> 
          <el-switch v-model="form.typeStatus" active-color="#13ce66" inactive-color="#D3D3D3" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCategory, getCategory, delCategory, addCategory, updateCategory } from "@/api/workflow/category";

export default {
  name: "Category",
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: false,
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
      // 【请填写功能名称】表格数据
      categoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        procTypeCode: "",
	      procTypeName: "",
        typeStatus: "",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id: [
        //   { required: true, message: "分类ID不能为空", trigger: "blur" }
        // ],
        procTypeName: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        procTypeCode: [
          { required: true, message: "分类编码不能为空", trigger: "blur" }
        ],
        // remark: [
        //   { required: true, message: "备注不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      console.log("获取列表信息")
      this.loading = true;
      listCategory(this.queryParams).then(response => {
        console.log("获取列表信息返回====", response)
        this.categoryList = response.data.records;
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
        id: undefined,
        procTypeName: undefined,
        procTypeCode: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        delFlag: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加流程分类";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      console.log("获取到的ID信息", row.id);
      const id = row.id || this.ids
      getCategory(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改流程分类";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            updateCategory(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addCategory(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      console.log("选中行数据", row)
      console.log("Vue原型", this)
      const categoryIds = row.id || this.ids;
      this.$modal.confirm(`是否确认删除【${row.procTypeName}】编号为"` + categoryIds + '"的数据项？').then(() => {
        this.loading = true;
        return delCategory(categoryIds);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      console.log("queryParams", this.queryParams)
      //列表数据作为表格数据
      const jsonData = this.categoryList
      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `分类编号,分类名称,分类编码,备注\n`;
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for(let i = 0 ; i < jsonData.length ; i++ ){
          for(const key in jsonData[i]){
              str+=`${jsonData[i][key] + '\t'},`;     
          }
          str+='\n';
      }
      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      // link.download =  "json数据表2.csv";
      link.download =  `category_${new Date().getTime()}.csv`;
      link.click();

      // this.download('system/category/export', {
      //   ...this.queryParams
      // }, `category_${new Date().getTime()}.xlsx`)
    },
  }
};
</script>
