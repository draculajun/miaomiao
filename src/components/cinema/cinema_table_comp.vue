<template>
    <div>
        <el-button type="primary" @click="queryTable">查询</el-button>
        <p></p>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column fixed prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="area" label="省份">
            </el-table-column>
            <el-table-column prop="city" :formatter="formatCity" label="市区">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="zipcode" label="邮编">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="queryPersonDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="deletePerson(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import {
        eventBus
    } from '@/main.js'

    import {
        setTimeout
    } from 'timers'

    import PersonApi from '@/api/personApi.js'
    import CityApi from '@/api/cityApi.js'

    export default {
        name: 'cinema',

        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 2,
                total: 0,
                pageSizes: [2, 4],
                personInfo: {
                    personid: ''
                },
                num: '',
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryTable();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryTable();
            },
            queryTable() {
                let params = {
                    'currentPage': this.currentPage,
                    'pageSize': this.pageSize,
                }
                PersonApi.page(params).then(responseBody => {
                    this.tableData = responseBody.pageData;
                    this.total = responseBody.total;
                });
            },
            queryPersonDetail(row) {
                this.personInfo.personid = ({
                    ...row
                }).id;
                this.$store.state.personInfo.personid = this.personInfo.personid;
                this.$router.push("/mine");
            },
            deletePerson(row){
                PersonApi.delete(({...row}).id).then(responseBody=>{
                    this.$message('删除成功');
                    this.queryTable();
                })
            },
            formatCity(row, column) {
                let city = row[column.property];
                let desc = '';
                this.$store.state.cityDomainalnList.forEach(element => {
                    if (city == element.name) {
                        desc = element.desc;
                        return;
                    }
                });
                return desc;
            }
        },
        destroyed() {

        },
        created() {

            let params = {};
            CityApi.cities(params).then(responseBody => {
                this.$store.state.cityDomainalnList = responseBody;
            })

            this.queryTable();

        },
        computed: {

        },
        export: 'cinemaTable'
    }
</script>

<style>



</style>