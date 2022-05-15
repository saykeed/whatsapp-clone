<template>
    <div class="home">
        <SearchUser />
        <div class="contacts" v-if="recentChats.length">
          <Eachcontact 
            v-for="contact in recentChats"
            :key="contact.timestamp"
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
import Skelenton from '@/components/Skelenton.vue'
import SearchUser from '@/components/SearchUser.vue'
import {useStore} from 'vuex'
import {computed, onBeforeMount, onMounted, ref, watch} from 'vue'
import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router'


export default {
  name: 'HomeView',
  components: { Eachcontact, SearchUser, Skelenton },
  setup() {
    // variables
    const store = useStore()
    const db = getFirestore();
    const fallbackCount = ref(5)
    const auth = getAuth()
    const router = useRouter()


    // functions
    const setSnapshotOnInbox = (userData) => {
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

    const fetchUserInfoFromDB = async (userTel) => {
        const docRef = doc(db, "regUsers", userTel);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          store.commit('updateUserdata', docSnap.data())
        } else {
          //alert('No details of this user in the database')
        }
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
      //console.log('userData updated', userData.value)
      store.dispatch('fetchRecentChats')
      setSnapshotOnInbox(userData.value)
    })

    // mounted properties
    onBeforeMount( async () => {
      store.commit('updateWelcomeStatus', true)
      //console.log('app unbeforemount')
        onAuthStateChanged(auth, async (user) => {
          if (user) {
              let userTel = user.phoneNumber;
              fetchUserInfoFromDB(userTel)
              store.commit('updateWelcomeStatus', false)
          } else {
            router.push('/login')
            store.commit('updateWelcomeStatus', false)
          }
        });
    })
    
    //setSnapshotOnInbox(userData.value)
   // store.commit('updateLoaderStatus', true)
    return { contacts, recentChats, fallbackCount }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

  div.home{
    background: black;
    min-height: calc(100vh - 100px);
  }
    
</style>

