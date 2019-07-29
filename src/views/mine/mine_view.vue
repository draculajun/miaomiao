<template>
    <div>
        <Header title='我的'></Header>
        <Toolbar></Toolbar>
        <br>
        {{getPersonid}}
        <!-- 存放从state中获得的personid，用于查询详单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input ref="relFormid" v-if="false" v-model="ruleForm.id"></el-input>
                <el-input v-model="ruleForm.name" style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择省份">
                    <el-option v-for="item in cityDomainalnList" 
                        :label="item.desc" 
                        :value="item.name" 
                        :key="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择生日" v-model="ruleForm.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="!ruleForm.id" @click="submitForm('ruleForm')">立即创建</el-button>
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
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert(this.$refs.formName);
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.cityDomainalnList = this.$store.state.cityDomainalnList;
        },
        computed: {
            //监听$store.state.personInfo.personid，有变动则调用接口查询Person详单（aaa其实用不着，但是在界面必须{{aaa}}定义，否则无法监听）
            getPersonid() {
                let id = this.$store.state.personInfo.personid;
                if (id) {
                    PersonApi.person(id).then(responseBody => {
                        this.ruleForm = responseBody;
                    });
                } else {
                    if (this.$refs.ruleForm) {
                        this.$refs.ruleForm.resetFields();
                    }
                }
            }
        },

    }
</script>

<style>

</style>