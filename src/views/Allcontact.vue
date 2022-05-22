<template>
    <div class="allcontacts">
        <AllcontactHeader />
        <div class="contacts" v-if="contacts.length">
          <Eachcontact 
            v-for="(contact, index) in contacts"
            :key="contact.index"
            :contact="contact"
          />
        </div>
        <div v-else>
           <Skelenton v-for="(skelenton, index) in fallbackCount" :key="skelenton.index"/>
        </div>
    </div>
</template>

<script>
import Eachcontact from '@/components/Eachcontact.vue'
import AllcontactHeader from '@/components/AllcontactHeader.vue'
import Skelenton from '@/components/Skelenton.vue'
import {computed, onMounted, ref} from 'vue'
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: 'allContactPage',
  components: { Eachcontact, AllcontactHeader, Skelenton },
  setup() {
    // variables
    const db = getFirestore()
    const contacts = ref([])
    const fallbackCount = ref(10)


    // functions
    const loadAllRegUsers = async () => {
          const querySnapshot = await getDocs(collection(db, "regUsers"));
          querySnapshot.forEach((doc) => {
            contacts.value.push(doc.data())
          });
    }

    // mounted
    onMounted(() => {
      loadAllRegUsers()
    })


   
    return { contacts, fallbackCount }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";
  div.allcontacts{
    background: $lightBackground;
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    
    button{
      background: blue;
      color: red;
    }
  }
    
</style>

