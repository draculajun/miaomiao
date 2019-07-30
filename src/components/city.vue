<template>
    <div>
        <!-- <h3 v-if="mult">多选列表框</h3> -->
        <el-select :multiple="mult" :collapse-tags="mult" :value="value" @change="change($event)" placeholder="请选择省份">
            <el-option v-for="item in cities" :label="item.desc" :value="item.name" :key="item.name"></el-option>
        </el-select>
    </div>
</template>

<script>
    import CityApi from '@/api/cityApi.js'
    import SelectApi from '@/components/select.js'

    export default {
        name: 'city',
        props: ['value', 'mult', 'allowAll'],
        data() {
            return {
                oldCities: [],
                cities: [],
                newCities: [],
            }
        },
        mounted() {
            CityApi.cities({}).then(responseBody => {
                this.cities = responseBody;
                if (this.mult && this.allowAll) {
                    SelectApi.allowAll(this.cities);
                }
                this.cities.forEach(element => {
                    this.newCities.push(element.name);
                });
            })
        },
        methods: {
            change: function (val) {
                if (this.mult) {
                    this.oldCities[0] = SelectApi.getSelectedItems(this.oldCities, this.cities, this.newCities, val);
                    this.$emit('input', this.oldCities[0]);
                } else {
                    this.$emit('input', val);
                }
            },
        }
    }
</script>

<style>

</style>