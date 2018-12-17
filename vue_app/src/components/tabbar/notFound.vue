<template>
    <div class="tp-notFound">
        <img src="http://127.0.0.1:3000/img/404.png" style="width: 200px;height: 150px"/>
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
                i:5
            }
        },
        created(){
            var timer=setInterval(()=>{
                --this.i || clearInterval(timer)
            },1000)

        }
    }
</script>

<style scoped>
.tp-notFound{
    text-align: center;
}
.tp-notFound img{
    margin-top: 20px;
}
.nF-text p{
    font: 20px bold;
}
</style>