<template>
    <div>
        <Header title='文件操作'></Header>
        <Toolbar></Toolbar>
        <br>
        <Attachment ownerTable='TICKET' docType='TICKET' ownerId='299126'></Attachment>
        <br>
        <Attachment :ownerTable='ownerTable' :docType='docType' :ownerId='ownerId'></Attachment>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header_comp.vue'
    import Toolbar from '@/components/toolbar/toolbar_comp.vue'
    import Footer from '@/components/footer/footer_comp.vue'
    import Attachment from '@/components/file/attachment.vue'

    export default {
        name: 'file',
        components: {
            Header,
            Toolbar,
            Footer,
            Attachment
        },
        data(){
            return{
                ownerTable: 'TICKET',
                docType: 'TICKET',
                ownerId: 299127

            }
        }

    }
</script>

<style>

</style>