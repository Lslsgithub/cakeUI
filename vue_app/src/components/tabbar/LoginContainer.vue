<template>
    <div class="app-login">
        用户名：<input type="text" placeholder="请输入用户名"  name="uname" v-model="uname"/>
        密码：<input type="password" placeholder="请输入密码" name="upwd" v-model="upwd"/>
        <mt-button type="primary" size="normal" @click="login()">登录</mt-button>
        <mt-button type="primary" size="normal" @click="register()">注册</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                uname:"",
                upwd:""
            }
        },
        methods:{
            //登录
            login(){
                if(this.uname=="") {
                    Toast("请输入用户名")
                    return
                }else if(this.upwd==""){
                    Toast("请输入密码")
                    return
                }
                this.$http.post("Login",{
                    uname:this.uname,
                    upwd:this.upwd
                })
                    .then(res=>{
                        if(res.body.code===1){
                            Toast(res.body.msg)
                            this.$store.commit('loginState') //登录成功，修改登录状态
                        }else{
                            Toast(res.body.msg)
                        }
                    })
            },
            /*跳转到注册页面*/
            register(){
                this.$router.push("/home/register")
            }
        }
    }
</script>

<style scoped>
.app-login{
    padding: 15px;
}
div.app-login>:nth-child(3){
    margin-left: 91px;
}
div.app-login>:last-child{
    margin-left: 5px;
}
</style>