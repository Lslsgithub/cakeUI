import Vue from "vue"
import Router from "vue-router"

//引入自定义组件
import homeContainer from "./components/tabbar/homeContainer.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"
import goodsList from "./components/goods/goodsList.vue"
import  goodsDetails from "./components/goods/goodsDetails.vue"
import shopping from "./components/tabbar/shopping.vue"
import  PhotoContainer from "./components/photo/PhotoContainer.vue"
import Login from "./components/tabbar/LoginContainer.vue"
import register from "./components/tabbar/register.vue"
import notFount from "./components/tabbar/notFound.vue"
import search from './components/search/search.vue'
Vue.use(Router)

//配置组件访问路径
export default new Router({
  routes: [
      //redirect重定向
    {path:'/',redirect:"/home"},
    {path:'/home',component:homeContainer},
    {path:'/home/newsList',component:newsList},
    {path:'/home/newsInfo',component:newsInfo},
     /*  /home/shop/1————以“/”方式传参
    {path:'/home/shop/:id',component:shop}*/
    {path:'/home/goodsList',component:goodsList},
    {path:'/home/goodsDetails',component:goodsDetails},
    {path:'/shopping',component:shopping},
    {path:'/home/PhotoContainer',component:PhotoContainer},
    {path:'/home/Login',component:Login},
    {path:'/home/register',component:register},
    {path:'/notFound',component:notFount},
      {path:'/search',component:search}
  ]
})
