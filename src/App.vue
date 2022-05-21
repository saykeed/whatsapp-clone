<template>
  <Topnav class="mobile" v-if="headerStatus" @showMenuOptions="showMenuOptions" @showSearchUser="showSearchUser"/>
  <Tabs class="mobile" v-if="headerStatus"/>
  <Allcontactsbtn class="mobile" v-if="headerStatus"/>
  <Menumenu v-if="menuBarStatus" @closeMenuOptions="closeMenuOptions"/>
  <Mainloader v-if="loaderStatus"/>
  <Welcome v-if="welcomeStatus"/>
  <transition
   @before-enter="beforeEnter"
   @enter="enter"
   @leave="leave"
  >
    <SearchUser v-if="searchUserStatus" @closeSearchUser="closeSearchUser"/>
  </transition>
  
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
import SearchUser from '@/components/SearchUser.vue'
import gsap from 'gsap'

export default {
  components: { Topnav, Tabs, Allcontactsbtn, Menumenu, Mainloader, Welcome, SearchUser },
  setup() {
    // variables
    const route = useRoute()
    let userData;
    const router = useRouter()
    const menuBarStatus = ref(false)
    const store = useStore()
    const auth = getAuth()
    const db = getFirestore()
    const searchUserStatus = ref(false)

    // functions 
    const showMenuOptions = () => {
      menuBarStatus.value = true;
    }

    const closeMenuOptions = () => {
      menuBarStatus.value = false;
    }

    const showSearchUser = () => {
      searchUserStatus.value = true
    }

    const closeSearchUser = () => {
      searchUserStatus.value = false
    }

    const beforeEnter = (el) => {
      el.style.transform = 'translateY(450px)'
      el.style.opacity = 0
    }

    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        translateY: 0,
        duration: 0.4,
        onComplete: done
      })
    }

    const leave = (el, done) => {
      gsap.to(el, {
        // opacity: 0,
        translateX: -450,
        duration: 0.4,
        onComplete: done
      })
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


    

    return { headerStatus, menuBarStatus, showMenuOptions, closeMenuOptions, loaderStatus, 
            welcomeStatus, searchUserStatus, showSearchUser, closeSearchUser, beforeEnter, enter, leave }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
  }

  /*for the responsieve screen of lg*/
  @media screen and (min-width:700px){
      .mobile{
        display: none;
      }
  }
</style>
