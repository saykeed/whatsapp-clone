<template>
    <div class="chatpageheader">
        <router-link to="/"><i class="material-icons">arrow_back</i></router-link>
        <img src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png" alt=""/>
        <div class="info">
            <h3>{{ name }}</h3>
            <p>Status</p>
        </div>
        <div class="icons">
            <i class="material-icons">videocam</i>
            <i class="material-icons middle">call</i>
            <i class="material-icons">menu</i>
        </div>
    </div>
</template>

<script>

export default{
    name: 'chatpageheader',
    props: ['name'],
    setup() {
        

      return {  }  
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .chatpageheader{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background: $headerBackground;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        padding: 0 0.5rem;

        a{
            color: white;
            text-decoration: none;
        }
        
        img{
            width: 40px;
            height: 40px;
            border-radius: 40px;
            object-fit: cover;
            margin: 0 0.5rem 0 0.2rem;
        }

        div.info{
            width: 100%;
            text-align: left;
        }

        div.icons{
            display: flex;
            align-items: center;
            justify-content: space-between;

            i{
               
               &.middle{
                   margin: 0 1rem;
               }
            }
            
        }
    }

</style>