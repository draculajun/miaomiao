<template>
    <div>
        <el-menu router :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/movie">
                <i>电影</i>
            </el-menu-item>
            <el-menu-item index="/cinema">
                <i>影院</i>
            </el-menu-item>
            <el-menu-item index="/mine">
                <i>我的</i>
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
                console.log(this.$route.path);
                return this.$route.path;
            }
        }
    }
</script>

<style>

</style>