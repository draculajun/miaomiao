<template>
    <div>
        <Header title='我的'></Header>
        <Toolbar></Toolbar>
        mine
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'

    export default {
        name: 'mine',
        components: {
            Header,
            Toolbar,
            Footer
        }
    }
</script>

<style>

</style>