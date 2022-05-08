<template>
    <div class="eachcontact">
        {{contact.name}}
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: 'HomeView',
  props: ['contact'],
  components: { },
  setup(props) {
    // variables
    const store = useStore()


    // functions


    console.log(props.contact)

    return {  }
  }
}
</script>

<style>

</style>
