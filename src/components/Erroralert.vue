<template>
    <div class="errorAlert" @click="closeAlert">
        <transition name="zoomIn">
            <div class="errorModal">
                <h3><slot></slot></h3>
            </div>
        </transition>
    </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
    setup() {
        // variables
        const store = useStore()

        
        // functions 
        const closeAlert = () => {
            store.commit('updateErrorAlertStatus', false)
        }


        return { closeAlert }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.errorAlert{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.700);
       
        div.errorModal{
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 500px;
            background: white;
            padding: 1rem;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.693), -2px -2px 2px rgba(0, 0, 0, 0.693);
            display:flex;
            align-items: center;
            justify-content: center;
            height: 150px;
        }        
    }

    .zoomIn-enter-from, .zoomIn-leave-to{
        transform: scale(0.6);
        opacity: 0;
    }
    .zoomIn-enter-active, .zoomIn-leave-active{
        transition: all 1s ease-in-out
    }
</style>