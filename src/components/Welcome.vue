<template>
    <div class="welcome">
        <img class="head" src="@/assets/img/logoheader.jpg" alt="Welcome screen">
        <img class="foot" src="@/assets/img/logofooter.jpg" alt="Welcome screen">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
    div.welcome{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        background: white;

        img{
            object-fit: cover;
            position: absolute;

            &.head{
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            &.foot{
                left: 50%;
                transform: translateX(-50%);
                bottom: 1.5rem;
            }
        }
    }
</style>