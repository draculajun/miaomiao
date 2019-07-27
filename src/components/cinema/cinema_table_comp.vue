<template>
    <div>
        <el-button type="primary" @click="queryTable">查询</el-button>
        <p></p>
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column fixed prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="area" label="省份">
            </el-table-column>
            <el-table-column prop="city" label="市区">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="zipcode" label="邮编">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
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
    export default {
        name: 'cinema',

        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 2,
                total: 0,
                pageSizes: [2, 4]
            }
        },
        methods: {
            handleClick(row) {
                alert(({
                    ...row
                }).name);
            },
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
                this.axios.post(`http://localhost:8081/person/page/`, params).then((response) => {
                    this.tableData = response.data.data.pageData;
                    this.total = response.data.data.total;
                    console.log(this.total);
                }).catch((response) => {
                    console.log(response);
                })
            }
        },
        export: 'cinemaTable'
    }
</script>

<style>

</style>