<template>
    <div>
        <Header title='喵喵电影'></Header>
        <Toolbar></Toolbar>
        movie
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
        }
    }
</script>

<style>

</style>