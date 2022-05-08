<template>
    <div class="sendBtn" @click="loadContacts">
        <i class="material-icons">send</i>
    </div>
</template>

<script>
import {useStore} from 'vuex'

export default{
    name: 'contactBtn',
    setup() {
        // variables
        const store = useStore()

        // functions
        const loadContacts = async () => {
            
        }


      return { loadContacts }  
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    div.sendBtn{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $whatsappGreen;
        color: white;
        cursor: pointer;
    }
</style>

