<template>
    <div class="home">
        <SearchUser />
        <div class="contacts" style="color: white;">
          <Eachcontact 
            v-for="(contact) in recentChats"
            :key="contact.timestamp"
            :contact="contact"
          />
          {{ recentChats }}
        </div>
        
    </div>
</template>

<script>
import Eachcontact from '@/components/Eachcontact.vue'
import SearchUser from '@/components/SearchUser.vue'
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch} from 'vue'
import { getFirestore, collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import sortObjectsArray from 'sort-objects-array'

export default {
  name: 'HomeView',
  components: { Eachcontact, SearchUser },
  setup() {
    // variables
    const store = useStore()
    const db = getFirestore();
    //const recentChats = ref([])


    // functions
    
    

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
    })





    // mounted
    onMounted(() => {
      //console.log('home mounted')
    })


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

