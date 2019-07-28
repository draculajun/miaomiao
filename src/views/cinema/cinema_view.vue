<template>
    <div>
        <Header title='影院'></Header>
        <Toolbar></Toolbar>
        <br>
        <CinemaTable></CinemaTable>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'
    import CinemaTable from '@/components/cinema/cinema_table_comp'

    export default {
        name: 'cinema',
        components: {
            Header,
            Toolbar,
            Footer,
            CinemaTable
        },
        
    }
</script>

<style>

</style>