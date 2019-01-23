<template>
 <div class="app-container">
     <!--顶部导航栏-->
     <mt-header fixed title="甜心蛋糕" >
         <router-link to="/" slot="left" v-show="path!=='/home'">
             <mt-button icon="back" @click="back()">返回</mt-button>
         </router-link>
     </mt-header>
     <!--显示不同的组件-->
    <router-view></router-view>
     <!--底部导航栏-->
     <nav class="mui-bar mui-bar-tab">
         <div @click="ac()">
         <router-link class="mui-tab-item " to="/home"  >
             <span class="mui-icon mui-icon-home mui-active" v-show="active==='home'"></span>
             <span class="mui-icon mui-icon-home" v-show="active!=='home'"></span>
             <span class="mui-tab-label">首页</span>
         </router-link>
         </div>
         <div @click="ac()">
         <router-link class="mui-tab-item " to="/home/Login" >
             <span class="mui-icon mui-icon-contact mui-active" v-show="active==='home/Login'"></span>
             <span class="mui-icon mui-icon-contact" v-show="active!=='home/Login'"></span>
             <span class="mui-tab-label" >会员</span>
         </router-link>
         </div>
         <div @click="ac()">
         <router-link class="mui-tab-item" to="/shopping">
             <span class="mui-icon mui-icon-extra mui-icon-extra-cart  mui-active" v-show="active==='shopping'">
                 <!--调用getters中获取数据的方法-->
                 <span class="mui-badge iconShow" v-show="state">{{optCount}}</span>
                 </span>
             <span class="mui-icon mui-icon-extra mui-icon-extra-cart" v-show="active!=='shopping'">
                 <!--调用getters中获取数据的方法-->
                 <span class="mui-badge" v-show="state">{{optCount}}</span></span>
             <span class="mui-tab-label">购物车</span>
         </router-link>
         </div>
         <div @click="ac()">
         <router-link class="mui-tab-item" to="/search">
             <span class="mui-icon  mui-icon-search mui-active" v-show="active==='search'"></span>
             <span class="mui-icon  mui-icon-search" v-show="active!=='search'"></span>
             <span class="mui-tab-label">搜索</span>
         </router-link>
         </div>
     </nav>
 </div>
</template>

<script>
    export default {
        data(){
            return {
                active:'',//激活
                state:'',//登录状态
                optCount:0, //购物车中物品数量
                path:""
            }
        },
        created(){ //加载页面时执行
            this.ac()
            this.getPath()
            this.isLogin()
        },
        watch: { //监视页面
            '$route' () {
                // router变化时，执行的代码
                this.ac()
                this.getPath()
                this.isLogin()
            }
        },
        methods:{
            ac(){//触发事件，获取路径——对比路径，图标激活显示
                this.active=this.$route.path.slice(1)
            },
            getPath(){//获取path，主页不显示返回
                this.path=this.$route.path
            },
            back(){ //返回
                this.$router.go(-1)
            },
            isLogin() {//验证是否登录——购物车商品种类数量
                this.state = this.$store.getters.isLogin //获取vuex中的登录状态
                var uid =this.$store.getters.uid
                if(this.state){
                    this.$http.get("shopCount?uid="+uid)
                        .then(res=>{
                            this.$store.commit('shopCart',res.body[0].count) //修改购物车中物品种类数量
                            this.optCount=this.$store.getters.optCount
                        })
                }
            }
        }
    }
</script>

<style>
/*设置底部tabbar的显示*/
nav.mui-bar.mui-bar-tab{
    display: flex;
    justify-content: space-around;
}
.app-container{
    padding-top:40px;
    padding-bottom:50px;
    overflow-x:hidden;
}
.mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
</style>
