<template>
    <div class="eachcontact">
        name: {{contact.name}}
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


    console.log(props.contact.name)

    return {  }
  }
}
</script>

<style>

</style>
