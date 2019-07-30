<template>
    <div>
        <Header title='我的'></Header>
        <Toolbar></Toolbar>
        <br>
        <!-- 存放从state中获得的personid，用于查询详单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号" prop="id" hidden>
                <el-input v-model="ruleForm.id" style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择省份">
                    <el-option v-for="item in cityDomainalnList" :label="item.desc" :value="item.name" :key="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择生日" v-model="ruleForm.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addPerson">新增</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp'
    import Toolbar from '@/components/toolbar/toolbar_comp'
    import Footer from '@/components/footer/footer_comp'
    import {
        eventBus
    } from '@/main.js'
    import PersonApi from '@/api/personApi.js'
    import CityApi from '@/api/cityApi.js'

    export default {
        name: 'mine',
        components: {
            Header,
            Toolbar,
            Footer
        },
        data() {
            return {
                cityDomainalnList: [],
                detail: '',
                ruleForm: {
                    id: '',
                    name: '',
                    city: '',
                    date: '',
                },
                rules: {
                    id: [{
                        required: false,
                        trigger: 'blur'
                    }],
                    name: [{
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    city: [{
                        required: true,
                        message: '请选择城市',
                        trigger: 'change'
                    }],
                    date: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'change',
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.id) {
                            PersonApi.update(this.ruleForm).then(responseBody => {
                                this.ruleForm.id = responseBody;
                                this.$message('更新成功');
                            });
                        } else {
                            PersonApi.insert(this.ruleForm).then(responseBody => {
                                this.ruleForm.id = responseBody;
                                this.$message('新增成功');
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addPerson() {
                this.$refs['ruleForm'].resetFields();
            },
        },
        created() {

            CityApi.cities({}).then(responseBody => {
                this.cityDomainalnList = responseBody;
            })

            if (this.$store.state.personInfo.personid != 0) {
                PersonApi.person(this.$store.state.personInfo.personid).then(responseBody => {
                    this.ruleForm = responseBody;
                });
            }

        },
        computed: {

        },
        watch: {
            '$route'(to, from) {

            },
        }
    }
</script>

<style>

</style>