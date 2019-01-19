<template>
    <div class="app-goodsList">
        <div class="goods-item" v-for="item in list" :key="item.pid">
            <a @click="getDetails(item.pid)">
                <img :src="item.img_url"/>
            </a>
                <h3 class="title">{{item.pname}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.newPrice}}</span>
                    <span class="old"><s>￥{{item.oldPrice}}</s></span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{item.count}} 件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[]
            }
        },
        methods:{
            getDetails(pid){ //跳转详情页
                this.$router.push("/home/goodsDetails?pid="+pid)
            },
            getList(){
                this.$http.get("productList")
                    .then(res=>{
                        this.list=res.body
                    })
            }
        },
        created(){
            this.getList()
        }
    }
</script>
<style>
    .app-goodsList{
        display:flex;     /*最外层设置弹性布局*/
        flex-wrap:wrap;   /*子元素换行*/
        justify-content:space-between;/*两端对齐*/
        padding:7px;      /*为子元素内补丁*/
    }
    .app-goodsList .goods-item{
        width:49%;               /*元素宽度*/
        border:1px solid #ccc;   /*边框*/
        box-shadow:0 0 8px #ccc; /*阴影*/
        margin:4px 0 ;
        padding:2px;
        display:flex;           /*弹性布局*/
        flex-direction:column;  /*垂直布局*/
        justify-content:space-between;/*两端对齐*/
        min-height:293px;       /*最小高度*/
    }
    .app-goodsList .goods-item img{
        width:100%;
    }
    .app-goodsList .goods-item .new{
        font-size: 16px;
        font-weight:bold;
        margin-left: 10px;
        color: red;
    }
    .app-goodsList .goods-item .old{
        color: grey;
        font-size: 12px;
        margin-left: 10px;
    }
</style>