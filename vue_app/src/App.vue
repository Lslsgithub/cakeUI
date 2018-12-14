<template>
 <div class="app-container">
     <!--顶部导航栏-->
     <mt-header fixed title="甜心蛋糕" ></mt-header>
     <!--显示不同的组件-->
    <router-view></router-view>
     <!--底部导航栏-->
     <nav class="mui-bar mui-bar-tab">
         <router-link class="mui-tab-item " to="/home">
             <span class="mui-icon mui-icon-home mui-active" v-if="active==='home'"></span>
             <span class="mui-icon mui-icon-home" v-else></span>
             <span class="mui-tab-label">首页</span>
         </router-link>
         <router-link class="mui-tab-item " to="/home/Login">
             <span class="mui-icon mui-icon-contact mui-active" v-if="active==='home/Login'"></span>
             <span class="mui-icon mui-icon-contact" v-else></span>
             <span class="mui-tab-label">会员</span>
         </router-link>
         <router-link class="mui-tab-item" to="/shopping">
             <span class="mui-icon mui-icon-extra mui-icon-extra-cart" >
                 <!--调用getters中获取数据的方法-->
                 <span class="mui-badge">{{$store.getters.optCount}}</span></span>
             <span class="mui-tab-label">购物车</span>
         </router-link>
         <a class="mui-tab-item" href="#">
             <span class="mui-icon  mui-icon-search"></span>
             <span class="mui-tab-label">搜索</span>
         </a>
     </nav>
 </div>
</template>

<script>
    export default {
        data(){
            return {
                active:'',
            }
        },
        mounted(){
            this.active = this.$route.path.slice(1);
        }
    }
</script>

<style>
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
