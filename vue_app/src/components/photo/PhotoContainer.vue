<template>
    <div class="app-photo">
        <!--卡片组件-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner" >
                    <!--图片懒加载列表-->
                    <ul>
                        <li v-for="item in list">
                            <img v-lazy="item.url" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        methods:{
            getImg(){
                this.$http.get("imagelist")
                    .then(res=>{
                        this.list=res.body
                    })
            }
        },
        created(){
            this.getImg()
        }
    }
</script>

<style scoped>
    .mui-card-content-inner ul{
        background: grey;
        padding-left: 0;
        margin: 0;
    }
    .mui-card-content-inner ul li{
        list-style: none;
    }
    .mui-card-content-inner ul li img{
        width: 100%;
    }
    .mui-card-content-inner ul li img[lazy=loading] {
        width: 100px;
        height: 100px;
        margin:  auto;
    }
</style>