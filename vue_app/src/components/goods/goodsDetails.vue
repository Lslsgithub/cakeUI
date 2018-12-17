<template>
    <div class="app-details">
        <!--轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--父组件的值传给子组件的props:["list"]-->
                    <swiper-box :list="list"></swiper-box>
                </div>
            </div>
        </div>
        <!--购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goods.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price"></p>
                    市场价：<s>￥{{goods.old}}</s>
                    销售价：<span class="now">￥{{goods.now}}</span>
                    <p class="content">购买数量:</p>
                    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='999'>
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub()" >-</button>
                        <input id="test" class="mui-input-numbox" type="number"  v-model="count"/>
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodsAdd()">+</button>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" @click="pay()">立即购买</mt-button>
                <mt-button @click="addCart()">加入购物车</mt-button>
            </div>
        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goods.goodSid}}</p>
                    <p>商品运费：50</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button @click="pay()">图文介绍</mt-button>
                <mt-button @click="pay()">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    /*1.引入swiper组件*/
    import swiper from "../sub/swiper.vue"
    /*局部引入mint-ui组件*/
    import {Toast} from "mint-ui"
    export default {
        data() {
            return {
                /*轮播图列表*/
                list:[],
                /*商品数量*/
                count:1,
                /*正在浏览的商品id*/
                id:"",
                /*正在浏览的商品详情*/
                goods:{}
            }
        },
        methods:{
            /*轮播图*/
            getImage() {
                this.$http.get("imagelist")
                    .then(res => {
                        this.list = res.body
                    })
            },
            /*商品详情*/
            getGoods(){
                this.$http.get("goodsDetails?id="+this.id)
                    .then(res=>{
                        this.goods=res.body
                    })
            },
            goodSub(){
                if(this.count==1)
                    return
                this.count--
            },
            goodsAdd(){
                if(this.count==999)
                    return
                this.count++
            },
            /*加入购物车*/
            addCart(){
                /*console.log(this.id,this.count)*/
                this.$http.get("addCart?id="+this.id+"&count="+this.count)
                    .then(res=>{
                        if(res.body.code == 1){
                       /*更新购物车商品的数量*/
                       //实质——修改Vuex中的共享数据
                       //调用mutations中修改数据的方法——可增加一个参数
                        this.$store.commit('add',this.count)
                            Toast(res.body.msg)
                        }else{
                            Toast(res.body.msg)
                        }
                    })
            },
            /*立即购买*/
            pay(){
                this.$router.push('/notFound')
            }
        },
        created() {
            this.id=this.$route.query.id //传入的参数值————商品编号
            this.getImage() //轮播图
            this.getGoods()  //商品信息
        },
    /*2.注册组件————子组件加入到父组件中*/
        components:{
            "swiper-box":swiper
        }
    }
</script>

<style scoped>
    .now{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
</style>