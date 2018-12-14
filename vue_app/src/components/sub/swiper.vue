<!--swiper轮播子组件-->
<template>
    <div class="app-swiper">
        <mt-swipe :auto="5000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.url"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        data(){
            return{}
        },
        /*接收父组件的数据*/
        props:["list"]
    }
</script>

<style scoped>
    .mint-swipe{
        height: 160px;
    }
    .mint-swipe img{
        width: 100%;
    }
</style>