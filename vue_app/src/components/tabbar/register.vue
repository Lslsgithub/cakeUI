<template>
    <div class="app-register">
        用户名：<input type="text" placeholder="请输入用户名" name="uname" v-model="uname"/>
        密码：<input type="password" placeholder="请输入密码" name="upwd" v-model="upwd"/>
        重复密码：<input type="password" placeholder="请输入密码" name="cupwd" v-model="cupwd"/>
        邮箱：<input type="email" placeholder="请输入邮箱" name="email" v-model="email"/>
        <mt-button type="primary" size="large" @click="register()">注册</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                uname:"",
                upwd:"",
                cupwd:"",
                email:""
            }
        },
        methods:{
            register(){
                if(this.uname=="") {
                    Toast("请输入用户名")
                    return
                }else if(this.upwd==""){
                    Toast("请输入密码")
                    return
                }else if(this.cupwd==""){
                    Toast("请重复输入密码")
                    return
                }/*else if(this.email==""){
                    Toast("请输入邮箱")
                    return
                }*/
                this.$http.post("register",{
                    uname:this.uname,
                    upwd:this.upwd,
                    cupwd:this.cupwd,
                    /*email:this.email*/
                })
                    .then((res)=> {
                        if(res.body.code===1){
                           Toast(res.body.msg)
                            this.$router.push("/home/Login")
                        }else{
                            Toast(res.body.msg)
                        }
                    })

            }
        }
    }
</script>

<style scoped>
    .app-register{
        padding: 15px;
    }
</style>