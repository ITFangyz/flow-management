<template>
    <el-dialog title="用户信息" :visible="true" @close="dialogClose">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入名称"
            clearable
            size="small"
            @keyup.enter.native="getUsers"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getUsers">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQueryParams">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="jobLists" @current-change="handleRowChange" highlight-current-row @select="tableSelectChange" @selection-change="selectionChange">
        <!-- <el-table-column  width="80" type="index"></el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="username" label="姓名" width="200"></el-table-column>
        <el-table-column property="mobile" label="手机号" width="200"></el-table-column>
        <el-table-column property="id" label="用户id"></el-table-column>
      </el-table>
      <div class="bottomPart">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[3, 10, 20, 50, 100]"
          :page-size="3"
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
import { listUsers } from '@/api/workflow/user'

export default {
    data(){
        return{
            // 查询参数
            queryParams: {
                current: 1,
                pageSize: 3
            },
            currentRow: null,
            selection: '',  //表格当前选中数据
            jobLists: [],
            total: 0,
        }
    },
    created(){
        this.getUsers()
    },
    methods:{
      selectionChange(selection){
        console.log("112", selection)
      },
        dialogClose(){
            console.log("弹窗关闭")
            this.$emit('getUserSelected')
        },
        //重置搜索条件
        resetQueryParams(){
            this.queryParams.username = ''
        },
        //处理选中项
        handleRowChange(val) {
            this.currentRow = val;
            console.log("选中项信息", this.currentRow)
        },
        //表格多选改变
        tableSelectChange(selection, row){
          console.log("表格多选改变", "selection", selection,"row", row)
          this.selection = selection
        },
        //获取岗位列表
        getUsers(){
            
            // let param = {
            //     current: 1,
            //     pageSize: 10
            // }
            console.log("查询用户参数", this.queryParams)
            listUsers(this.queryParams).then(res => {
                this.jobLists = res.data.records;
                this.total = res.data.total;
                console.log("获取用户列表", res)
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.queryParams.pageSize = val
            this.getUsers()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.queryParams.current = val
            this.getUsers()
        },
        handleSubmit(){
            //把选中行信息反显
            this.$emit('getUserSelected', this.selection)
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