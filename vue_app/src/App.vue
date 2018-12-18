<template>
 <div class="app-container">
     <!--顶部导航栏-->
     <mt-header fixed title="甜心蛋糕" ></mt-header>
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
                 <span class="mui-badge iconShow">{{$store.getters.optCount}}</span>
                 </span>
             <span class="mui-icon mui-icon-extra mui-icon-extra-cart" v-show="active!=='shopping'">
                 <!--调用getters中获取数据的方法-->
                 <span class="mui-badge">{{$store.getters.optCount}}</span></span>
             <span class="mui-tab-label">购物车</span>
         </router-link>
         </div>
         <div @click="ac()">
         <router-link class="mui-tab-item" to="/search">
             <span class="mui-icon  mui-icon-search mui-active" v-show="active==='notFound'"></span>
             <span class="mui-icon  mui-icon-search" v-show="active!=='notFound'"></span>
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
                active:''
            }
        },
        mounted(){
            this.ac()
        },
        methods:{
            //触发事件，获取路径
            ac(){
                this.active=this.$route.path.slice(1)
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
