<template>
    <div>
        <el-menu router :default-active="this.$route.path" class="el-menu-demo" mode="horizontal">
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

        },
    }
</script>

<style>

</style>