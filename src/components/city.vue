<template>
    <div>
        <el-select :value="value" @input="change($event)" placeholder="请选择省份">
            <el-option v-for="item in cities" :label="item.desc" :value="item.name" :key="item.name"></el-option>
        </el-select>
    </div>
</template>

<script>
    import CityApi from '@/api/cityApi.js'

    export default {
        name: 'city',
        props: ['value'],
        data() {
            return {
                cities: [],
            }
        },
        mounted() {
            CityApi.cities({}).then(responseBody => {
                this.cities = responseBody;
            })
        },
        methods: {
            change: function (val) {
                this.$emit('input', val);
            }
        },
    }
</script>

<style>

</style>