<template>
    <div class="home">
        i am home
        <div class="contacts">
          {{ contacts}}
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'HomeView',
  components: { },
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
