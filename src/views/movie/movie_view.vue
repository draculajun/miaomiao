<template>
    <div>
        <Header title='子路由'></Header>
        <Toolbar></Toolbar>
        <div id='content'>
            <el-menu router :default-active="defaultActive" class="el-menu-demo" mode="horizontal"
                @select="handleSelect">
                <el-menu-item index="/movie/tab1">
                    <i>Tab1</i>
                </el-menu-item>
                <el-menu-item index="/movie/tab2">
                    <i>Tab2</i>
                </el-menu-item>
            </el-menu>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'

    export default {
        name: 'movie',
        components: {
            Header,
            Toolbar,
            Footer
        },
        methods: {
            handleSelect() {
                console.log(this.$route.path);
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