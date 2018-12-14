
<template>
    <div class="app-newsinfo">
        <h1>{{news.title}}</h1>
        <h4>{{news.content}}</h4>
        <!--调用子组件-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    //引入子组件
    import comment from "../sub/comment.vue"
    export default {
        data(){
            return{
                news:{},
                id:""
            }
        },
        created(){
            /*this.$route.query.id————获取传递的参数*/
            this.id=this.$route.query.id
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get("http://127.0.0.1:3000/newsInfo")
                    .then(res=>{
                        this.news=res.body
                    })
            }
        },
        //2.注册子组件
        components:{
            "comment-box":comment
        }
    }
</script>

<style scoped>

</style>