<template>
    <div class="eachcontact" @click="addUser">
        <img src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png" alt=""/>
        <div class="info">
            <h3>{{contact.Name}}</h3>
            <p>{{ contact.lastMsg}}</p>
        </div>
        <p class="time">{{ contact.time }}</p>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  props: ['contact'],
  components: { },
  setup(props) {
    // variables
    const router = useRouter()

    // functions
        const addUser = () => {
            router.push({
                name: 'Chatpage',
                params: {
                    id: JSON.stringify(props.contact)
                }
            })
        }

    return { addUser }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    div.eachcontact{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        cursor: pointer;
        text-decoration: none;
        -webkit-tap-highlight-color: $fadeBlack;

        // &:active{
        //     background: $fadeBlack;
        // }

        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
            object-fit: cover;
        }

        div.info{
            width: calc(100% - 180px);
            margin-left: 1rem;
            text-align: left;

            h3{
                color: white;
            }

            p{
                color: $fadeBlack;
                width: 80%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
        p.time{
            color: $fadeBlack;
            font-size: 0.8rem;
            width: 120px;
        }
    }

</style>
