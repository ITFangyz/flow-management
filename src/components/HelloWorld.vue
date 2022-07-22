<template>
  <div class="hello">
    <div>
      <k-form-design />
    </div>
    <!-- <h1 @click="onSave">保存</h1> -->
    <!-- <process-designer
      ref="modelDesigner"
      v-loading="loading"
      :key="`designer-${loadIndex}`"
      :bpmnXml="bpmnXml"
      :designerForm="{}"
    /> -->

    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
// import ProcessDesigner from '@/components/ProcessDesigner';
import xml from './xml.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    // designerForm: {
    //   type: Object,
    //   required: false
    // }
  },
  components:{
    // ProcessDesigner
  },
  data(){
    return{
      loading: false,
      bpmnXml: xml.xml,
      loadIndex: 0,
    }
  },
  created(){
    console.log("xml", xml.xml)
  },
  methods:{
    onSave() {
      let refProcessDesigner = this.$refs.modelDesigner.$refs.processDesigner;
      refProcessDesigner.onSave().then(xml => {
        console.log("保存时流程数据", xml)
        this.bpmnXml = xml;
        // saveXml({
        //   name: this.designerForm.processName,
        //   category: this.designerForm.category,
        //   xml: this.bpmnXml
        // }).then(res => {
        //   this.result.icon = 'success';
        //   this.result.title = '成功';
        //   this.result.describe = res.msg;
        // }).catch(res => {
        //   this.result.icon = 'error';
        //   this.result.title = '失败';
        //   this.result.describe = res.msg;
        // }).finally(() => {
        //   this.onNext();
        //   this.$emit('save');
        // })
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.workflow-designer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #ebeef5;
  top: 0;
  left: 0;
  z-index: 1010;
  padding: 10px;
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
</style>
