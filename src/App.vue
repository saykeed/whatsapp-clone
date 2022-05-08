<template>
  <Topnav v-if="headerStatus"/>
  <Tabs v-if="headerStatus"/>
  <Allcontactsbtn v-if="headerStatus"/>
  <router-view/>
</template>

<script>
import Topnav from '@/components/Topnav.vue'
import Tabs from '@/components/Tabs.vue'
import Allcontactsbtn from '@/components/Allcontactsbtn.vue'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'


export default {
  components: { Topnav, Tabs, Allcontactsbtn },
  setup() {
    // variables
    const route = useRoute()

    
    // computed properties
      const headerStatus = computed(() => {
        let forbidden = ['Chatpage']
        if(forbidden.includes(route.name)) {
          return false
        } else{
          return true
        }
      })

    return { headerStatus }
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
