<template>
    <div class="eachcontact">
        name: {{contact.name[0]}}
        <p> tel: {{ contact.tel}}</p>
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
