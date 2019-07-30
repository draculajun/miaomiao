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

    export default {
        name: 'city',
        props: ['value', 'mult', 'allowAll'],
        data() {
            return {
                oldCities: [],
                cities: [],
                searchCities: [],
            }
        },
        mounted() {
            CityApi.cities({}).then(responseBody => {
                this.cities = responseBody;
                if (this.mult && this.allowAll) {
                    this.cities.unshift({
                        name: '---ALL---',
                        desc: '全部'
                    });
                }
                this.cities.forEach(element => {
                    this.searchCities.push(element.name);
                });
            })
        },
        methods: {
            change: function (val) {

                if (this.mult) {
                    const allValues = [];
                    // 保留所有值
                    for (const item of this.cities) {
                        allValues.push(item.name)
                    }
                    // 用来储存上一次的值，可以进行对比
                    const oldVal = this.oldCities.length === 1 ? this.oldCities[0] : [];
                    // 若是全部选择
                    if (val.includes('---ALL---')) this.searchCities = allValues;
                    // 取消全部选中 上次有 当前没有 表示取消全选
                    if (oldVal.includes('---ALL---') && !val.includes('---ALL---')) this.searchCities = [];
                    // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
                    // 新老数据都有全部选中
                    if (oldVal.includes('---ALL---') && val.includes('---ALL---')) {
                        const index = val.indexOf('---ALL---');
                        val.splice(index, 1); // 排除全选选项
                        this.searchCities = val;
                    }
                    // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
                    if (!oldVal.includes('---ALL---') && !val.includes('---ALL---')) {
                        if (val.length === allValues.length - 1) {
                            this.searchCities = ['---ALL---'].concat(val)
                        } else {
                            this.searchCities = val;
                        }
                    }
                    // 储存当前最后的结果 作为下次的老数据
                    this.oldCities[0] = this.searchCities;

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