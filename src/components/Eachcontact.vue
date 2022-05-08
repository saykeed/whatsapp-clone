<template>
    <div class="eachcontact">
        {{name}} -- {{ tel }}
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'HomeView',
  props: ['name', 'tel'],
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
