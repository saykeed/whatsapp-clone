<template>
    <div class="topnav">
        <div class="firstrow">
            <h2>Whatsapp</h2>
            <div class="icons">
                <i class="material-icons">search</i>
                <i class="material-icons" @click="openMenu">menu</i>
            </div>
        </div> 
    </div>
</template>

<script>

export default{
    name: 'TopNav',
    setup(props, { emit }) {
    
        // functions 
        const openMenu = () => {
            emit('showMenuOptions')
        }

      return { openMenu }  
    },
}
</script>

<style lang="scss" scoped>
    .topnav{
        background: rgb(67, 67, 67);
        color: rgba(255, 255, 255, 0.524);
        padding: 0 1rem;
        z-index: 999;
        
        .firstrow{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;

            .icons{
                width: 70px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

    }
</style>