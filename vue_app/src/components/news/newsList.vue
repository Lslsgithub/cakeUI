<template>
    <div class="app-newsliat">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id" >
                <router-link :to="'/home/newsInfo?id='+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body" >
                      {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.ctime | dataFilter}}</span>
                            <span>点击&nbsp;&nbsp;{{item.point}}&nbsp;&nbsp;次</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="default" size="large" @click="getNews()" v-if="pageIndex!==pageCount">加载更多</mt-button>
        <mt-button v-else disabled size="large">没有更多了</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[],
                pageIndex:0, //当前页数
                pageSize:5  ,//每页的数量
                pageCount:"",
            }
        },
        methods:{
            getNews(){
                this.pageIndex++
                var url="http://127.0.0.1:3000/newslist"+"?pno="+this.pageIndex+"&pageSize="+this.pageSize
                this.$http.get(url)
                    .then(res=>{
                        //拼接数组————是现实显示多页
                        this.list=this.list.concat(res.body.data)
                        //总页数
                        this.pageCount=res.body.pageCount
                    })
                    },
                },
        created(){
            this.getNews()
        }

    }
</script>

<style scoped>
p.mui-ellipsis{
    display: flex;
    justify-content: space-between; //弹性布局————两端对齐
    font-size: 12px;
    color: #0aa1ed;
}

</style>