<template>
    <div class="app-shopping">
        <!--轮播组件-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--父组件的值传给子组件的props:["list"]-->
                    <swiper-box :list="list"></swiper-box>
                </div>
            </div>
        </div>
        <!--商品列表-->
        <div class="mui-card">
            <div class="mui-card-header">商品列表</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--左侧图片    右侧文字-->
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="item in shop">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" src="">
                                <div class="mui-media-body">
                                    {{item.title}}
                                    <p class='mui-ellipsis'>
                                        <span class="price">￥{{item.price}}</span>
                                        <span class="count">
                                            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='999'>
                                                <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub(item.id)">-</button>
                                                <input id="test" class="mui-input-numbox" type="number"   :value="item.count"/>
                                                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodsAdd(item.id)">+</button>
                                            </div>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <hr/>
                    <div>
                        合计：<span>{{total}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*引入子组件*/
    import swiper from "../sub/swiper.vue"
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                list:[],
                shop:[],
            }
        },
        methods: {
            /*轮播图*/
            getImage() {
                this.$http.get("imagelist")
                    .then(res => {
                        this.list = res.body
                    })
            },
            /*购物车信息*/
           getShopping(){
                this.$http.get("shop")
                    .then(res=>{
                        this.shop=res.body
                    })
            },
            /*数量*/
            goodSub(id){
                for(var i of this.shop) {
                    if(id==i.id){
                        if(i.count==1)
                            return
                        i.count--
                        break
                    }
                }
            },
            goodsAdd(id){
                for(var i of this.shop) {
                    if(id==i.id){
                        if(i.count==999)
                            return
                        i.count++
                        break
                    }
                }
            },
            isLogin() {//验证是否登录
                var state=this.$store.getters.isLogin //获取vuex中的登录状态
                if(state){
                    this.getShopping()
                }else{
                    Toast({
                        message: '您还未登录，无法加载购物车',
                        position: 'center',
                        duration: 1500
                    })
                }
            }
        },
        computed:{
            /*合计*/
           total(){
               var sum=0
               for(var i of this.shop) {
                    sum+=i.price * i.count;
               }
               return sum
           }
        },
        created(){
            this.getImage()
            this.isLogin()
        },
        /*注册子组件*/
        components:{
            "swiper-box":swiper
        }
    }
</script>

<style scoped>
    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
    }
</style>