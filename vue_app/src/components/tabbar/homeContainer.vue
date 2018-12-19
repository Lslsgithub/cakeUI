<template>
    <div class="app-home">
        <!--轮播图-->
        <mt-swipe :auto="5000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.url">
            </mt-swipe-item>
        </mt-swipe>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList" >
                   <img src="../../img/menu1.png"/>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click.stop.prevent="jumpShop()">
                    <img src="../../img/menu6.png"/>
                    <div class="mui-media-body">商品</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click.stop.prevent="jumpSearch()">
                    <img src="../../img/search.png"/>
                    <div class="mui-media-body">搜索</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click.stop.prevent="jumpPay()">
                    <img src="../../img/new.jpg"/>
                    <div class="mui-media-body">新品</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a @click.stop.prevent=" jumpNotFound()">
                    <img src="../../img/menu3.png"/>
                    <div class="mui-media-body">点餐</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/service.jpg"/>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:""
            }
        },
        methods:{
            getImage(){
                this.$http.get("http://127.0.0.1:3000/imagelist")
                    .then(result=>{
                        this.list=result.body
                    })
            },
                jumpShop(){
                    /*this.$router.push("/home/shop")*/
                    /*this.$router.push("/home/shop?id=10")*/
                   /* this.$router.push("/home/shop/12")*/
                    this.$router.push("/home/goodsList")
                },
            jumpPay(){
                this.$router.push("/home/PhotoContainer")
            },
            jumpSearch(){
                this.$router.push("/search")
            },
            jumpNotFound(){
                    this.$router.push('/notFound')
            }
        },
        created(){
            this.getImage()
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe img{
      width: 100%;
    }
    .app-container .mui-grid-view.mui-grid-9{
        background: #FFFFFF;
        border: 0;
    }
    .app-container .mui-grid-view.mui-grid-9 img{
        width: 60px;
        height: 60px;
    }
</style>