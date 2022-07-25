<!-- 部门级联选择器 -->
<template>
  <div class='departmentCascader'>
    <el-cascader 
      v-model="departmentId"
      :options="depts"
      :props="deptsProps"
      clearable
      style="width: 100%;"
      placeholder="请选择部门"
      @change="handleChange"
    >
    </el-cascader>
  </div>
</template>

<script>
// import { ElNotification } from 'element-plus';
import { listDepts } from '@/api/workflow/user'

export default {
  name: 'departmentCascader',
  props:{
    departmentInfo:{
      type: Array,
      default: ()=>[]
    }
  },
  data () {
    return {
      departmentId: this.departmentInfo,
      depts:[],
      deptsProps: {
        value: "id",
        checkStrictly: true,
        label: "name"
      }
    };
  },
  mounted () {
    this.getDept()
  },
  methods: {
    async getDept(){
      let data = {
        code: '', //默认不传返回所有部门树信息
        parentCode: 0 //默认传0返回所有部门树信息
      }
      console.log("部门查询param", data)
      listDepts(data).then(res => {
        console.log("查询部门返回", res)
        this.depts = res.data || []
      })
      // var res = await this.$API.dept.getDeptTree.post(data);
      // if(res.code == 200){
			// 		this.depts = res.data || []
			// 	}else{
			// 		// ElNotification.error({
			// 		// 	title: '请求错误',
			// 		// 	message: res.message
			// 		// });
			// 	}
    },
    handleChange(){
      this.$emit('sendDepartmentId',this.departmentId)
    },
  },

  computed: {},

  components: {},
}

</script>
<style lang='scss' scoped>
</style>