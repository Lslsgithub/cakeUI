<template>
    <div class="app-login">
        用户名：<input type="text" placeholder="请输入用户名" name="uname" v-model="uname"/>
        密码：<input type="password" placeholder="请输入密码" name="upwd" v-model="upwd"/>
        <mt-button type="primary" size="normal" @click="login()">登录</mt-button>
        <mt-button type="primary" size="normal" @click="register()">注册</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"

    export default {
        data() {
            return {
                uname: "",
                upwd: "",
                path: "",//保存上一页面的path
                timer:"",//保存定时器
            }
        },
        created() {
            //接收上一个页面的路径
            this.path = this.$route.query.path
        },
        destroyed(){ //关闭页面时，停止定时器
            clearTimeout(this.timer)
        },
        methods: {
            //登录
            login() {
                var state = this.$store.getters.isLogin //获取vuex中的登录状态
                if (!state) {
                    if (this.uname == "") {
                        Toast("请输入用户名")
                        return
                    } else if (this.upwd == "") {
                        Toast("请输入密码")
                        return
                    }
                    this.$http.post("Login", {
                        uname: this.uname,
                        upwd: this.upwd
                    })
                        .then(res => {
                            if (res.body[1].code === 1) { //返回的code==1,说明登陆成功
                                if (this.path){  //判断是否有上一页的path
                                    Toast({
                                        message: res.body[1].msg + ",即将返回来时页面",
                                        duration: 2000
                                    })
                                }else{
                                    Toast({
                                        message: res.body[1].msg+"即将打开主页",
                                        duration: 2000
                                    })
                                }
                                this.$store.commit('loginState', res.body[0].uid) //登录成功，修改登录状态,uid
                                if (this.path) {//判断是否有上一页的path
                                    setTimeout(() => {
                                        //this.$router.go(-1) //返回来时页面
                                        this.$router.push(this.path)
                                    }, 2000)
                                }else{
                                    this.timer=setTimeout(()=>{
                                        this.$router.push('/home')
                                    },2000)
                                }
                            } else {
                                Toast(res.body.msg)
                            }
                        })
                } else {
                    return
                }
            },
            /*跳转到注册页面*/
            register() {
                this.$router.push("/home/register")
            }
        }
    }
</script>

<style scoped>
    .app-login {
        padding: 15px;
    }

    div.app-login > :nth-child(3) {
        margin-left: 91px;
    }

    div.app-login > :last-child {
        margin-left: 5px;
    }
</style>