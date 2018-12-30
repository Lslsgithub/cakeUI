<template>
    <div id="app-search">
        <div class="mui-input-row mui-input-search">
            <input type="search" class="mui-input-clear" placeholder=""
                   v-model="sc" @keyup.13="searchClick()" @input="search()" v-focus>

            <button @click="searchClick()" class="btn_search">搜索</button>
        </div>
        <div class="goodsList" v-show="list">
            <div class="goods-item" v-for="item in list" :key="item.id">
                <a @click="getDetails(item.id)">
                    <img :src="item.img_url"/>
                </a>
                <h3 class="title">{{item.cname}}</h3>
                <div class="info">
                    <p class="price">
                        <span class="new">￥150</span>
                        <span class="old"><s>￥300</s></span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩 10 件</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="sc-img" v-show="!list">
            <img src="http://127.0.0.1:3000/img/search.png"/>
        </div>
    </div>
</template>

<script>
    /*引入提示框*/
    import {Toast, Indicator} from 'mint-ui'

    export default {
        data() {
            return {
                sc: "",
                list: ""
            }
        },
        methods: {
            //根据输入的值，发送请求查询数据
            searchClick() {
                if(!this.sc.trim()){ //去掉空格后，搜索框无值时终止函数
                    return
                }
                //加载提示框
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$http.get("http://127.0.0.1:3000/search?sc=" + this.sc)
                    .then(res => {
                        Indicator.close()
                            if (res.data.length > 0) {
                                this.list = res.data
                            } else {
                                this.list = 0 //清空页面商品列表
                                Toast({
                                    message: '没有此项商品',
                                    position: 'center',
                                    duration: 1500
                                });
                            }
                    })
            },
            //输入时触发
            search() {
                //输入框有值时才触发
                //this.sc && this.searchClick()
                if (!this.sc) {
                    this.list = ""
                } else {
                    this.searchClick()
                }
            },
            //点击商品，跳转详情页
            getDetails(id) {
                this.$router.push("/home/goodsDetails?id=" + id)
            }
        }
    }
</script>

<style scoped>
    /*搜索框及按钮样式*/
    .mui-input-clear {
        width: 80%;
        margin: 10px 0 0 10px;
    }

    .btn_search {
        margin-top: 10px;
    }

    .goodsList {
        display: flex; /*最外层设置弹性布局*/
        flex-wrap: wrap; /*子元素换行*/
        justify-content: space-between; /*两端对齐*/
        padding: 7px; /*为子元素内补丁*/
    }

    .goodsList .goods-item {
        width: 49%; /*元素宽度*/
        border: 1px solid #ccc; /*边框*/
        box-shadow: 0 0 8px #ccc; /*阴影*/
        margin: 4px 0;
        padding: 2px;
        display: flex; /*弹性布局*/
        flex-direction: column; /*垂直布局*/
        justify-content: space-between; /*两端对齐*/
        min-height: 293px; /*最小高度*/
    }

    .goodsList .goods-item img {
        width: 100%;
    }

    .goodsList .goods-item .new {
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        color: red;
    }

    .goodsList .goods-item .old {
        color: grey;
        font-size: 12px;
        margin-left: 10px;
    }

    /*图片*/
    .sc-img {
        width: 200px;
        height: 200px;
        margin: 40% auto;
    }

    .sc-img img {
        width: 100%;
        height: 100%;
    }
</style>
