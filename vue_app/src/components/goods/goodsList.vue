<template>
    <div class="app-goodsList">
        <div class="goods-item" v-for="item in list" :key="item.id">
            <a @click="getDetails(item.id)">
                <img :src="item.img_url"/>
            </a>
                <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.new_price}}</span>
                    <span class="old"><s>￥{{item.old_price}}</s></span>
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
                list:[ {id:1,img_url:"http://127.0.0.1:3000/img/cake1.jpg",title:"蓝莓拿破仑蛋糕",new_price:198,old_price:300,count:50},
                    {id:2,img_url:"http://127.0.0.1:3000/img/cake2.jpg",title:"数字蛋糕",new_price:198,old_price:300,count:50},
                    {id:3,img_url:"http://127.0.0.1:3000/img/cake3.jpg",title:"雪精灵蛋糕",new_price:198,old_price:300,count:50},
                    {id:4,img_url:"http://127.0.0.1:3000/img/cake4.jpg",title:"粉红玫瑰森林蛋糕",new_price:198,old_price:300,count:50},
                    {id:5,img_url:"http://127.0.0.1:3000/img/cake5.jpg",title:"阿尔蒙麦香蛋糕",new_price:198,old_price:300,count:50},
                    {id:6,img_url:"http://127.0.0.1:3000/img/cake6.jpg",title:"牛乳蓝莓雪域双拼蛋糕",new_price:198,old_price:300,count:50}]
            }
        },
        methods:{
            getDetails(id){
                this.$router.push("/home/goodsDetails?id="+id)
            }
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