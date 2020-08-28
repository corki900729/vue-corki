<template>
    <div class="page404">
        <div>这里是404页面</div>
    </div>
</template>
<script>
export default {
    name: "Page404",
    computed: {
        message() {
            return "the message 404"
        }
    },
}
</script>
<style lang="scss" scoped>
.page404 {
    text-align: center;
    display: flex;
    align-items: center;
}
    
</style>