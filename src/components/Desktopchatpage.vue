<template>
    <div class="desktopchatpage">
        <div class="header">
            <div class="profile">
                <img :src="data.Photo" alt="no image">
                <p>{{ data.Name }}</p>
            </div>
            <div class="icons">
                <i class="material-icons">add_circle_outline</i>
                <i class="material-icons">message</i>
                <i class="material-icons">menu</i>
            </div>
        </div>
        <div class="footer">
            <Desktopchatbar :senderData="senderData" :receiver="data"/>
        </div>
        <div class="chatarea">
            <Chatarea :chats="chats" :senderData="senderData" :receiverTel="data.Tel"/>
        </div>
        
    </div>
</template>

<script>
import Desktopchatbar from '@/components/Desktopchatbar.vue'
import Chatarea from '@/components/Chatarea.vue'
import { useStore } from 'vuex'
import {computed, watch, ref } from 'vue'

export default {
    components: { Desktopchatbar, Chatarea },
    props: ['data', 'chats'],
    setup(props) {
        // variables
        const store = useStore()
        

        // functions
        

        // computed
        const senderData = computed(() => {
            return store.state.userData
        })

        
      return { senderData }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.desktopchatpage{
        position: relative;
        background-image: url("@/assets/img/Chatbackground.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 100%;
        padding: 50px 0;
        overflow: auto;

        div.header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 50px;
            display: flex;
            align-items: center;
            background: #eae6df;
            padding: 0 0.8rem;

            div.profile{
                width: calc(100% - 130px);
                display: flex;
                align-items: center;

                img{
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 2.5rem;
                    object-fit: cover;
                    object-position: top center;
                    margin-right: 1rem;
                }
            }

            div.icons{
                width: 130px;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        }

        div.footer{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eae6df;
            padding: 0 0.8rem;
        }

        div.chatarea{
            width: 100%;
            overflow: auto;
            padding: 0 1rem;
            height: calc(100vh - 100px);
        }
    }

</style>