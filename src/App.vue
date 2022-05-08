<template>
  <Topnav />
  <Tabs />
  <Allcontactsbtn />
  <router-view/>
</template>

<script>
import Topnav from '@/components/Topnav.vue'
import Tabs from '@/components/Tabs.vue'
import Allcontactsbtn from '@/components/Allcontactsbtn.vue'

export default {
  components: { Topnav, Tabs, Allcontactsbtn }
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
