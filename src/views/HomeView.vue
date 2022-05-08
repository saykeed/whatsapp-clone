<template>
    <div class="home">
        i am home
        <div class="contacts">
          <Eachcontact 
            v-for="(contact, index) in contacts"
            :key="contact.index"
            :contact="contact"
          />
          {{ contacts }}
        </div>
    </div>
</template>

<script>
import Eachcontact from '@/components/Eachcontact.vue'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'HomeView',
  components: { Eachcontact },
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
