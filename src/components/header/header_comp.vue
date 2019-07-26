<template>
    <header id="header">
        <h1>{{title}}</h1>
    </header>
</template>

<script>
    export default {
        name: "Header",
        props: {
            title: {
                type: String,
                default: '喵喵影院头'
            }
        }
    }
</script>

<style>

</style>