<template>
    <div>
        <Header title='喵喵电影'></Header>
        <Toolbar></Toolbar>
        <div id='content'>
            <el-menu router :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @mouseenter="abc">
                <el-menu-item index="/movie/tab1">
                    <i>Tab1</i>
                </el-menu-item>
                <el-menu-item index="/movie/tab2">
                    <i>Tab2</i>
                </el-menu-item>
            </el-menu>
            <keep-alive>
                <router-view/>
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
        methods:{
            abc(){
                console.log(this.$route.path);
            }
        }
    }
</script>

<style>

</style>