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
                <!-- <el-select v-model="ruleForm.city" placeholder="请选择省份">
                    <el-option v-for="item in cityDomainalnList" :label="item.desc" :value="item.name" :key="item.name">
                    </el-option>
                </el-select> -->
                <City v-model="ruleForm.city"></City>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择生日" v-model="ruleForm.date"
                            style="width: 100%;">
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

        <City :multiple="true" v-model="mutCities1"></City>
        <br>
        <City :multiple="true" :allowAll="true" v-model="mutCities2"></City>
        <br>
        <City :multiple="true" :allowAll="true" :filterable="true" v-model="mutCities3"></City>

        <br>
        <el-form :model="form" ref="form" label-width="80px">
            <el-upload class="upload-demo"  :actions="''" :http-request="uploadFile"
                :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                    <!-- 只能上传jpg/png文件，且不超过500kb -->
                </div>
            </el-upload>
        </el-form>
        <br>

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
    import City from '@/components/city'

    import AttachmentApi from '@/api/attachment.js'

    export default {
        name: 'mine',
        components: {
            Header,
            Toolbar,
            Footer,
            City
        },
        data() {
            return {
                fileList: [],
                mutCities1: ['SH'],
                mutCities2: ['SH', 'BJ'],
                mutCities3: ['SH'],
                cityDomainalnList: [],
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
            handleRemove(file, fileList) {
                this.deleteFile(file.docLinkSid);
            },
            handlePreview(file) {
                console.log(file.url);
                window.open(file.url);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            uploadFile(e){
                let fileObject = e.file;
                let formData = new FormData();
                formData.append("file", fileObject);
                AttachmentApi.upload(formData, 'TICKET', 'TICKET', 299127).then(responseBody => {
                    this.$message("上传成功");
                    this.downloadList('TICKET', 299127);
                })
            },
            downloadList(ownerTable, ownerId){
                AttachmentApi.downloadList(ownerTable, ownerId).then(responseBody => {
                    this.fileList = responseBody;
                });
            },
            deleteFile(docLinkSid){
                AttachmentApi.delete(docLinkSid).then(responseBody => {
                    this.$message("删除成功");
                })
            }
        },
        created() {

            CityApi.cities({}).then(responseBody => {
                this.cityDomainalnList = responseBody;
            })

            if (this.$store.state.person.personInfo.personid != 0) {
                PersonApi.person(this.$store.state.person.personInfo.personid).then(responseBody => {
                    this.ruleForm = responseBody;
                });
            }

            this.downloadList('TICKET', 299127);

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