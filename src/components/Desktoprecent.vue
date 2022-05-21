<template>
    <div class="eachcontact" @click="addUser">
        <img :src="contact.Photo" alt=""/>
        <div class="info">
            <h3>{{contact.Name}} <p class="time">{{ contact.time }}</p></h3>
            <p class="message"><i class="material-icons" v-if="checkMessage">check</i>{{ contact.lastMsg}}</p>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  name: 'HomeView',
  props: ['contact'],
  components: { },
  setup(props, { emit }) {
    // variables
    const router = useRouter()
    const store = useStore()
    


    // functions
    const addUser = () => {
        emit('passContactObject', props.contact)
    }

    // computed 
    const userData = computed(() => {
        return store.state.userData
    })

    const checkMessage = computed(() => {
        if(props.contact.Tel != userData.value.Tel) {
            return true
        } else {
            return false
        }
    })


    return { addUser, checkMessage }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.eachcontact{
        height: 80px;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        cursor: pointer;
        text-decoration: none;
        -webkit-tap-highlight-color: $fadeBlack;


        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
            object-fit: cover;
        }

        div.info{
            width: 100%;
            margin-left: 1rem;
            text-align: left;

            h3{
                color: rgba(0, 0, 0, 0.686);
                display: flex;
                align-items: center;
                justify-content: space-between;

                p.time{
                    color: rgba(0, 0, 0, 0.611);
                    font-size: 0.8rem;
                }
            }

            p.message{
                color: rgba(0, 0, 0, 0.611);
                width: 80%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                i{
                    vertical-align: middle;
                    margin-right: 0.3rem;
                    font-size: 1rem;
                }
            }
        }
    }

</style>
