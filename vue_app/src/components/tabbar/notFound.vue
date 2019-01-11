<template>
    <div class="tp-notFound">
        <img src="http://127.0.0.1:3000/img/404.png"/>
        <div class="nF-text">
            <p>该功能还在开发中.....</p>
            <p>将在{{i}}秒后,返回来时页面</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                i:5,
                timer:""
            }
        },
        created(){
            this.timer=setInterval(()=>{
                --this.i || (clearInterval(this.timer),this.$router.go(-1))
            },1000)
        },
        destroyed(){
            if(this.timer) { //关闭页面时，如果定时器在运行则关闭
                clearInterval(this.timer);
            }
        }


    }
</script>

<style scoped>
.tp-notFound{
    text-align: center;
}
.tp-notFound img{
    width: 200px;
    height: 150px;
    margin-top: 20px;
}
.nF-text p{
    font: 20px bold;
}
</style>