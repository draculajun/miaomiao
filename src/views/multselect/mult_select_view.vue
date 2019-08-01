<template>
    <div>
        <Header title='表单'></Header>
        <Toolbar></Toolbar>

        <br>

        <City :multiple="true" v-model="mutCities1"></City>
        <br>
        <City :multiple="true" :allowAll="true" v-model="mutCities2"></City>
        <br>
        <City :multiple="true" :allowAll="true" :filterable="true" v-model="mutCities3"></City>
        <footer></footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'
    import City from '@/components/city.vue'
    import CityApi from '@/api/cityApi.js'

    export default {
        name: 'file',
        components: {
            Header,
            Toolbar,
            Footer,
            City,
        },
        data() {
            return {
                mutCities1: ['SH'],
                mutCities2: ['SH', 'BJ'],
                mutCities3: ['SH'],
                cityDomainalnList: [],
            }
        },
        created() {
            CityApi.cities({}).then(responseBody => {
                this.cityDomainalnList = responseBody;
            })
        },

    }
</script>

<style>

</style>