<template>
    <div class="chatComponent">
        <div v-for="(chat) in chats"
            :key="chat.timestamp"
            :class="{ right: chat.senderTel == senderData.Tel, left: chat.senderTel == receiverTel.phoneNumber }"
        >
            <div class="actualChat">
                <p>{{ chat.text }}</p>
                <p class="timestamp">{{ chat.time }}</p>
            </div>
        </div>
        <div class="bottom" ref="bottom"></div>
    </div>
</template>

<script>
import {computed, watch, ref } from 'vue'

export default {
    props: ['chats', 'receiverTel', 'senderData'],
    setup(props) {
        // variables
        const bottom = ref(null)

        // set a watcher on the chats to do something with it
        watch(() => props.chats, () => {
            // console.log('chats updataed')
            bottom.value?.scrollIntoView({behavior: 'smooth'})
        })

      return { bottom }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.chatComponent{
        width: 100%;
        height: 100%;
        overflow: auto;

        

      div{
        width: 100%;
        margin: 0.2rem 0;
        display: flex;
        height: auto;

        p.timestamp{
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.46);
        }
        &.left{
          justify-content: flex-start;

          div.actualChat{
            width: fit-content;
            background: rgb(24, 23, 23);
            color: white;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            text-align: left;
            border-radius: 0.5rem;
            max-width: 80%;
          }
        }

        &.right{
          justify-content: flex-end;

          div.actualChat{
            width: fit-content;
            background: $whatsappGreen;
            color: white;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            text-align: right;
            border-radius: 0.5rem;
            max-width: 80%;
          }
        }
      }
      div.bottom{
        height: 50px;
      }
    }    

    ::-webkit-scrollbar {
        width: 0px;
    }
</style>