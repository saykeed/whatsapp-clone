<template>
    <div class="allcontacts">
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
import ContactsX from 'cordova-plugin-contacts-x';
import Eachcontact from '@/components/Eachcontact.vue'
import {useStore} from 'vuex'
import {computed, onMounted} from 'vue'

export default {
  name: 'allContactPage',
  components: { Eachcontact },
  setup() {
    // variables
    const store = useStore()


    // functions


    // computed
    const contacts = computed(() => {
         return store.state.contacts
    })

    
    // mounted 
        onMounted(() => {
            alert('mounted')
            window.ContactsX.hasPermission(function(success) {
                alert('success');
            }, function (error) {
                alert('error');
            });
        })

   

    return { contacts }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";
  div.allcontacts{
    background: black;
    min-height: calc(100vh - 100px);
  }
    
</style>

