<template>
    <div class="tabs">
            <p>CHATS</p>
            <p>STATUS</p>
            <p>CALLS</p>
    </div>
</template>

<script>

export default{
    name: 'tabsView',
    setup() {
        

      return {  }  
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .tabs{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 50px;
        position: sticky;
        top: 0;
        background: $tealGreen;
        color: rgba(255, 255, 255, 0.524);
        z-index: 999;

        p{
            padding-bottom: 10px;
            text-align: center;
            width: 100%;
            font-size: 13px;
        }
    }

</style>