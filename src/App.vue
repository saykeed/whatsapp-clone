<template>
  <Topnav v-if="headerStatus" @showMenuOptions="showMenuOptions"/>
  <Tabs v-if="headerStatus"/>
  <Allcontactsbtn v-if="headerStatus"/>
  <Menumenu v-if="menuBarStatus" @closeMenuOptions="closeMenuOptions"/>
  <Mainloader v-if="loaderStatus"/>
  <Welcome v-if="welcomeStatus"/>
  <router-view/>
</template>

<script>
import Topnav from '@/components/Topnav.vue'
import Welcome from '@/components/Welcome.vue'
import Tabs from '@/components/Tabs.vue'
import Menumenu from '@/components/Menumenu.vue'
import Mainloader from '@/components/Mainloader.vue'
import Allcontactsbtn from '@/components/Allcontactsbtn.vue'
import { useRouter, useRoute } from 'vue-router'
import { computed, onBeforeMount, ref } from 'vue'
import {useStore} from 'vuex'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  components: { Topnav, Tabs, Allcontactsbtn, Menumenu, Mainloader, Welcome },
  setup() {
    // variables
    const route = useRoute()
    let userData;
    const router = useRouter()
    const menuBarStatus = ref(false)
    const store = useStore()
    const auth = getAuth()
    const db = getFirestore()

    // functions 
    const showMenuOptions = () => {
      menuBarStatus.value = true;
    }

    const closeMenuOptions = () => {
      menuBarStatus.value = false;
    }

    
    // computed properties
      const headerStatus = computed(() => {
        let forbidden = ['Chatpage', 'Allcontact', 'Login']
        if(forbidden.includes(route.name)) {
          return false
        } else{
          return true
        }
      })

      const loaderStatus = computed(() => {
          return store.state.loaderStatus
      })
      const welcomeStatus = computed(() => {
          return store.state.welcomeStatus
      })


    

    return { headerStatus, menuBarStatus, showMenuOptions, closeMenuOptions, loaderStatus, welcomeStatus }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
