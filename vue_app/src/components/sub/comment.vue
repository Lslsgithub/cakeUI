<template>
    <div class="app-comment">
        <hr />
        <!--发表评论区域-->
        <textarea placeholder="请吐槽最多120个字" maxlength="120" v-model="msg">
     </textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <!--显示评论区域-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
                <div class="cmt-info">
                    第{{i+1}}楼 用户:{{item.user_name}}
                    发表时间:{{item.ctime | dataFilter}}</div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button type="default" size="large" @click="getNews()" v-if="pageIndex!==pageCount">加载更多</mt-button>
        <mt-button v-else disabled size="large">没有更多了</mt-button>
    </div>
</template>
<script>
    //单独引入Toast组件
    import {Toast} from "mint-ui"
    export default {
        data(){
            return {
                msg:"" , //双向绑定用户评论
                pageCount:"",
                list:[],
                pageSize:5,
                pageIndex:0
            }
        },
        methods:{
            postComment(){
                //1:获取新闻编号
                var nid = this.id;
                //2:获取评论内容
                var pmsg = this.msg;
                //3:判断新闻评论内容不能为空,提示用户
                if(pmsg.trim().length==0){
                    Toast("评论内容不能为空!")
                    return;
                }
                //4:发送post请求
                var url = "http://127.0.0.1:3000/postComment";
                this.$http.post(url,{nid:nid,msg:pmsg}).then(result=>{
                    //5:获取服务器程序返回
                    //6:提示用户 "评论成功"
                    Toast(result.body.msg)
                    //显示最新评论————只显示第一页
                    this.pageIndex=0
                    this.list=[]
                    this.getNews()
                })

            },
            getNews(){
                this.pageIndex++ //页码自增
                /*var url="http://127.0.0.1:3000/comment?id="+this.id+"&pno="+this.pageIndex+"&pageSize="+this.pageSize*/
                var url="comment?id="+this.id+"&pno="+this.pageIndex+"&pageSize="+this.pageSize
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
        },
        props:["id"]//接收父组件传递的数据
    }
</script>
<style>
    .app-comment h1{
        font-size:18px;    /*评论组件 h1*/
    }
    .app-comment textarea{ /*评论组件多行文本框*/
        font-size:14px;      /*文字调小一些*/
        height:85px;         /*高度*/
        margin:0;
    }
    .app-comment .cmt-list{/*评论列表*/
        margin:5px 0;        /*顶部和前面元素间距*/
    }
    .app-comment .cmt-list .cmt-info{
        line-height:30px;
        background:#ccc;
    }
    .app-comment .cmt-list .cmt-body{
        line-height:35px;
        text-indent:2em;
    }
</style>
