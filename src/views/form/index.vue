<template>
    <div class="form">
        <k-form-design 
            title="表单设计器"
            :toolbars="['save', 'preview', 'importJson', 'exportJson', 'exportCode']"  
        />
    </div>
</template>

<script>
export default {
    name: 'form',
    data(){
        return{

        }
    }
}
</script>

<style scoped lang="less">
.form{
    margin-top: -75px;
    .header{
        background: #409EFF!important;
    }
}

</style>