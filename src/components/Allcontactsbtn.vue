<template>
    <div class="contactBtn" @click="loadContacts">
        <i class="material-icons">chat</i>
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
            
            // const supported = ('contacts' in navigator && 'ContactsManager' in window)
            if ('contacts' in navigator && 'ContactsManager' in window) {
                alert('yes')
            } else {
                alert('no')
            }    

            try {
                const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: true});
                console.log(contacts)
                store.commit('updateContacts', contacts)
            } catch (err) {
                console.log(err)
            }
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

