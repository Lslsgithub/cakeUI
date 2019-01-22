import Vue from "vue"
import App from "./App.vue"
import router from "./router"

//单个引入mintui库的组件————按需引入
//1.引入组件mintui库的组件
/*import {Lazyload,Button,Header,Swipe, SwipeItem} from 'mint-ui'
//2.注册到当前项目中
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button)
/!*图片懒加载*!/
Vue.use(Lazyload)*/

/*引入mintui库的组件————完整引入*/
import MintUI from "mint-ui"
Vue.use(MintUI)

//发送ajax请求的组件————全部引入
import VueResource  from "vue-resource"
Vue.use(VueResource)

import"mint-ui/lib/style.css"
Vue.config.productionTip = false

//加载mui的css文件
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"

//定义过滤器————转换时间格式
Vue.filter("dataFilter",function (val) {
  var date = new Date(val)
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var d=date.getDate()
  var hour=date.getHours()
  var minutes=date.getMinutes()
  var seconds=date.getSeconds()
    return `${year}-${month}-${d} ${hour}:${minutes}:${seconds}`
})

//配置VueResource服务器的根目录
Vue.http.options.root="http://127.0.0.1:3000/"
/* 简化：var url="comment?id="+this.id+"&pno="+this.pageIndex+"&pageSize="+this.pageSize*/
//修改请求头————post
//Vue.http.options.emulateJSON=true

/*创建Vuex的实例对象*/
/*1.引入Vuex*/
import Vuex from "vuex"
/*2.注册组件*/
Vue.use(Vuex)
/*3.创建Vuex的实例对象*/
var store=new Vuex.Store({
    state:{
        count:0 ,//保存共享数据————购物车中商品的数量
        isLogin:false ,//保存登录状态
        uid:"" //保存用户id
    },
    //修改数据
    mutations:{
      /*可增加一个参数————控制增加的数量*/
      add(state,c){ //state参数共享的数据
          if(state.count==999)
          return
          state.count+=c
      },
      sub(state){
          if(state.count==1)
              return
          state.count--
      },
      loginState(state,uid){ //登录成功修改登录状态,uid
          state.isLogin=true
          state.uid=uid
      },
      shopCart(state,c){//加载购物车数量
          state.count=c
      }
    },
    //获取数据
    getters:{
      optCount(state){
        return state.count //返回共享的数据——购物车中数量
      },
      isLogin(state){
          return state.isLogin //获取登录状态
      },
      uid(state){
          return state.uid //获取用户id
      }
    }
});

/*创建自定义指令--自动获取焦点*/
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
});

new Vue({
  router,
  render: h => h(App),
/*4.将Vuex注册到Vue的实例对象中*/
  store
}).$mount("#app")
