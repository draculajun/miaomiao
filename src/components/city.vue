<template>
    <div>
        <!-- <h3 v-if="multiple">多选列表框</h3> -->
        <el-select :value="value" :multiple="multiple" :collapse-tags="multiple" :filterable="filterable"
            @change="change($event)" placeholder="请选择省份">
            <el-option v-for="item in citiesList" :label="item.desc" :value="item.name" :key="item.name"></el-option>
        </el-select>
    </div>
</template>

<script>
    import CityApi from '@/api/cityApi.js'
    import SelectApi from '@/components/select.js'

    export default {
        name: 'city',
        props: ['value', 'multiple', 'allowAll', 'filterable'],
        data() {
            return {
                oldCityKeys: [],
                citiesList: [],
            }
        },
        mounted() {
            CityApi.cities({}).then(responseBody => {
                this.citiesList = responseBody;
                if (this.multiple && this.allowAll) {
                    this.citiesList = SelectApi.allowAll(this.citiesList, 'name', 'desc');
                }
            })
        },
        methods: {
            change: function (newCityKeys) {
                if (this.multiple) {
                    this.$emit('input', SelectApi.getSelectedItems(this.oldCityKeys, this.citiesList, newCityKeys, 'name'));
                } else {
                    this.$emit('input', val);
                }
            },
        }
    }
</script>

<style>

</style>