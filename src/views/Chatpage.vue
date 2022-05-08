<template>
    <div class="chatpage">
      <ChatpageHeader :name="data.name[0]"/>
      <Chatbar />
        i am the chatpage
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import ChatpageHeader from '@/components/ChatpageHeader.vue'
import Chatbar from '@/components/Chatbar.vue'

export default {
  name: 'Chatpage',
  components: { ChatpageHeader, Chatbar },
  setup() {
    // variables
    const store = useStore()
    const route = useRoute()
    let data = ref( JSON.parse(route.params.id))


    // functions


    // mounted
    onMounted(() => {
      
    })
    return { data }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";
  
  div.chatpage{
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    background: black;
    color: white;
    padding: 0.5rem;
  }
    
</style>

