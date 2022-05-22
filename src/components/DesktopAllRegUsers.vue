<template>
    <div class="desktopAllRegUsers">
        <div class="header">
            <i class="material-icons" @click="closeDesktopAllUsers">arrow_back</i>
            <h2>New Chat</h2>
        </div>
        <div class="regUsers">
            <Desktoprecent 
                v-for="(contact, index) in contacts"
                :key="contact.index"
                :contact="contact"
                @passContactObject="setupChat"
            />
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Desktoprecent from '@/components/Desktoprecent.vue'
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
    components: { Desktoprecent },
    setup(props, { emit }) {
        // variables
        const db = getFirestore()
        const contacts = ref([])

        // functions
        const closeDesktopAllUsers = () => {
            emit('closeDesktopAllUsers')
        }

        const fetchAllRegUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "regUsers"));
            querySnapshot.forEach((doc) => {
                contacts.value.push(doc.data())
            });
        }

        const setupChat = (contact) => {
            emit('setupChat', contact)
            closeDesktopAllUsers()
        }

        // mounted
        onMounted(() => {
            fetchAllRegUsers()
        })


      return { closeDesktopAllUsers, contacts, setupChat }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.desktopAllRegUsers{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        div.header{
            width: 100%;
            height: 100px;
            padding: 1rem;
            display: flex;
            align-items: flex-end;
            background: $whatsappGreen;
            color: white;

            i{
                margin-right: 1rem;
                vertical-align: middle;
                cursor: pointer;
            }
        }
        div.regUsers{
            width: 100%;
            height: 100%;
            overflow: auto;
            background: white;
        }
    }

</style>