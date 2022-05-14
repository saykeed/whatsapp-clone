<template>
    <div class="allcontacts">
        <AllcontactHeader />
        <div class="contacts">
            i am all contacts
          <Eachcontact 
            v-for="(contact, index) in contacts"
            :key="contact.index"
            :contact="contact"
          />
        </div>
    </div>
</template>

<script>
import Eachcontact from '@/components/Eachcontact.vue'
import AllcontactHeader from '@/components/AllcontactHeader.vue'
import {useStore} from 'vuex'
import {computed, onMounted} from 'vue'

export default {
  name: 'allContactPage',
  components: { Eachcontact, AllcontactHeader },
  setup() {
    // variables
    const store = useStore()


    // functions
   

    // computed
    const contacts = computed(() => {
         return store.state.contacts
    })

   

   

    return { contacts }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";
  div.allcontacts{
    background: black;
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    
    button{
      background: blue;
      color: red;
    }
  }
    
</style>

