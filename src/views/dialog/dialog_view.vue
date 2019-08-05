<template>
    <div>
        <Header title='表格'></Header>
        <Toolbar></Toolbar>
        <br>


        <City :multiple="true" v-model="ruleForm.city"></City>

        <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="60%" center>

            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号" prop="id" hidden>
                    <el-input v-model="ruleForm.id" style="width: 30%;"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 30%;"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="city">
                    <City :multiple="true" v-model="ruleForm.city"></City>
                </el-form-item>
                <el-form-item label="生日" required>
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择生日"
                                v-model="ruleForm.date" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </span>
        </el-dialog>

        <br>

        <Footer></Footer>
    </div>

</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'
    import CityApi from '@/api/cityApi.js'
    import City from '@/components/city'

    export default {
        name: 'dialog',
        data() {
            return {
                centerDialogVisible: false,
                ruleForm: {
                    id: '',
                    name: '',
                    city: ['SH'],
                    date: '',
                },
                cityDomainalnList: [],
            };
        },
        components: {
            Header,
            Toolbar,
            Footer,
            City,
        },
        created() {

            CityApi.cities({}).then(responseBody => {
                this.cityDomainalnList = responseBody;
            })

        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>