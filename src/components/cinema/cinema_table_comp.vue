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

    import PersonApi from '@/api/personApi.js'
    import CityApi from '@/api/cityApi.js'
    import BaseApi from '@/api/api.js'

    export default {
        name: 'cinema',

        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 2,
                total: 0,
                pageSizes: [2, 4, 6],
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
                this.$store.state.person.personInfo.personid = row.id;
                // this.$router.push({path: `/mine/${this.personInfo.personid}`});
                this.$router.push('mine');
            },
            deletePerson(row) {
                PersonApi.delete(row.id).then(responseBody => {
                    this.$message('删除成功');
                    if (this.tableData.length == 1 && this.pageSize > 1) {
                        this.currentPage = this.currentPage - 1;
                    }
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
            this.$store.state.person.personInfo.personTableCurrentPage = this.currentPage;
            this.$store.state.person.personInfo.personTablePageSize = this.pageSize;
        },
        created() {

            CityApi.cities({}).then(responseBody => {
                this.$store.state.cityDomainalnList = responseBody;
            })

            this.queryTable();

            this.currentPage = this.$store.state.person.personInfo.personTableCurrentPage || this.currentPage;
            this.pageSize = this.$store.state.person.personInfo.personTablePageSize || this.pageSize;
            this.queryTable();

        },
        computed: {

        },
        export: 'cinemaTable'
    }
</script>

<style>



</style>