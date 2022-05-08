<template>
    <div class="eachcontact">
        {{contact.name[0]}}
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'HomeView',
  props: ['contact'],
  components: { },
  setup() {
    // variables
    const store = useStore()


    // functions


    

    return {  }
  }
}
</script>

<style>

</style>
