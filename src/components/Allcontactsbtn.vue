<template>
    <div class="contactBtn" @click="loadContacts">
        <i class="material-icons">chat</i>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default{
    name: 'contactBtn',
    setup() {
        // variables
        const router = useRouter()

        // functions
        const loadContacts = async () => {
            router.push('/allcontact')
        }


      return { loadContacts }  
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    div.contactBtn{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $whatsappGreen;
        color: white;
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        cursor: pointer;
    }
</style>

