<template>
    <div>
        <Header title='影院'></Header>
        <Toolbar></Toolbar>
        cinema
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'

    export default {
        name: 'cinema',
        components: {
            Header,
            Toolbar,
            Footer
        }
    }
</script>

<style>

</style>