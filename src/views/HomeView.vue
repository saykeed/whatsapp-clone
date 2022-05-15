<template>
    <div class="home">
        <SearchUser />
        <div class="contacts" style="color: white;">
          <Eachcontact 
            v-for="contact in recentChats"
            :key="contact.timestamp"
            :contact="contact"
          />
          
        </div>
        
    </div>
</template>

<script>
import Eachcontact from '@/components/Eachcontact.vue'
import SearchUser from '@/components/SearchUser.vue'
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch} from 'vue'
import { getFirestore, collection, onSnapshot } from "firebase/firestore";


export default {
  name: 'HomeView',
  components: { Eachcontact, SearchUser },
  setup() {
    // variables
    const store = useStore()
    const db = getFirestore();
    //const recentChats = ref([])


    // functions
    const setSnapshotOnInbox = (userData) => {
      store.commit('updateLoaderStatus', false)
      const q = collection(db, "regUsers", userData.Tel, 'Inbox');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              //console.log('new message in inbox')
              store.dispatch('fetchRecentChats')
          }
        });
      });
    }
    

    // computed
    const contacts = computed(() => {
         return store.state.contacts
    })
    const userData = computed(() => {
        return store.state.userData
    })
    const recentChats = computed(() => {
        return store.state.recentChats
    })


    // setup a watch on the userData
    watch(userData, () => {
      store.dispatch('fetchRecentChats')
      setSnapshotOnInbox(userData.value)
    })





    // mounted
    onMounted(() => {
      //console.log('home mounted')
      
    })

   // store.commit('updateLoaderStatus', true)
    return { contacts, recentChats }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

  div.home{
    background: black;
    min-height: calc(100vh - 100px);
  }
    
</style>

