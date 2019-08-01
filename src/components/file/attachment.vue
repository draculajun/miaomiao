<template>
    <div style="text-align:center">
        <el-form :model="form" ref="form" label-width="80px">
            <el-upload class="upload-demo" :actions="''" :http-request="uploadFile" :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                    只能上传*文件，且不超过500kb
                </div>
            </el-upload>
        </el-form>
    </div>

</template>

<script>
    import AttachmentApi from '@/api/attachment.js'

    export default {
        name: 'attachment',
        props: ['ownerTable', 'docType', 'ownerId', 'docLinkSid'],
        data() {
            return {
                fileList: '',
            }
        },
        methods: {
            handleRemove(file, fileList) {
                this.deleteFile(file.docLinkSid);
            },
            handlePreview(file) {
                window.open(file.url);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            uploadFile(e) {
                let fileObject = e.file;
                let formData = new FormData();
                formData.append("file", fileObject);
                AttachmentApi.upload(formData, this.ownerTable, this.docType, this.ownerId).then(responseBody => {
                    this.$message("上传成功");
                    this.downloadList(this.ownerTable, this.ownerId);
                })
            },
            downloadList(ownerTable, ownerId) {
                AttachmentApi.downloadList(ownerTable, ownerId).then(responseBody => {
                    this.fileList = responseBody;
                });
            },
            deleteFile(docLinkSid) {
                AttachmentApi.delete(docLinkSid).then(responseBody => {
                    this.$message("删除成功");
                })
            }
        },
        created() {
            this.downloadList(this.ownerTable, this.ownerId);
        },
    }
</script>

<style>

</style>