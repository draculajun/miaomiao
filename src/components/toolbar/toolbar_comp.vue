<template>
    <div>
        <el-menu router :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/movie">
                <i>子路由</i>
            </el-menu-item>
            <el-menu-item index="/cinema">
                <i>表格</i>
            </el-menu-item>
            <el-menu-item index="/mine">
                <i>表单</i>
            </el-menu-item>
            <el-menu-item index="/file">
                <i>附件</i>
            </el-menu-item>
            <el-menu-item index="/multselect">
                <i>下拉列表</i>
            </el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        name: 'toolbar',
        data() {
            return {

            }
        },
        methods: {
            handleSelect(key){
                console.log(key);
            }
        },
        computed: {
            //获取当前路由渲染页面菜单
            defaultActive() {
                return this.$route.path;
            }
        }
    }
</script>

<style>

</style>