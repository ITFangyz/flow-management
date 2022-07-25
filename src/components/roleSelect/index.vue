<template>
    <el-dialog title="角色信息" :visible="true" @close="dialogClose">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入名称"
            clearable
            size="small"
            @keyup.enter.native="getRoles"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getRoles">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQueryParams">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="roleLists" @current-change="handleRowChange" highlight-current-row>
        <el-table-column  width="80" type="index"></el-table-column>
        <el-table-column property="name" label="角色名称" width="200"></el-table-column>
        <el-table-column property="departmentName" label="部门名称" width="200"></el-table-column>
        <el-table-column property="id" label="角色ID"></el-table-column>
      </el-table>
      <div class="bottomPart">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="bottomPart">
        <!-- <el-button v-show="currentRow" type="primary" @click="handleSubmit">确定</el-button> -->
        <el-button  type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { listRoles } from '@/api/workflow/user'

export default {
    data(){
        return{
            // 查询参数
            queryParams: {
                current: 1,
                pageSize: 10
            },
            currentRow: null,
            roleLists: [],
            total: 0,
        }
    },
    created(){
        this.getRoles()
    },
    methods:{
        dialogClose(){
            console.log("弹窗关闭")
            this.$emit('getJobSelected')
        },
        //重置搜索条件
        resetQueryParams(){
            this.queryParams.name = ''
        },
        //处理选中项
        handleRowChange(val) {
            this.currentRow = val;
            console.log("选中项信息", this.currentRow)
        },
        //获取角色列表
        getRoles(){
            // let param = {
            //     current: 1,
            //     pageSize: 10
            // }
            console.log("查询角色参数", this.queryParams)
            listRoles(this.queryParams).then(res => {
                this.roleLists = res.data.records;
                this.total = res.data.total;
                console.log("获取角色列表", res)
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryParams.pageSize = val
            this.getRoles()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryParams.current = val
            this.getRoles()
        },
        handleSubmit(){
            //把选中行信息反显
            this.$emit('getJobSelected', this.currentRow)
        }
    },
}
</script>

<style scoped>
.bottomPart{
  margin-top: 20px;
  text-align: right;
}
</style>