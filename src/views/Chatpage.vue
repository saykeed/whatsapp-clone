<template>
    <div class="chatpage">
      <ChatpageHeader :name="data.Name"/>
      <Chatbar @sendMessage="sendMessage"/>
        <div class="chatArea">
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
        
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import ChatpageHeader from '@/components/ChatpageHeader.vue'
import Chatbar from '@/components/Chatbar.vue'
import {phone} from 'phone';
import { getFirestore, collection, addDoc, onSnapshot, query, where, setDoc, doc  } from "firebase/firestore";
import dateFormat, { masks } from "dateformat";
import sortObjectsArray from 'sort-objects-array'

export default {
  name: 'Chatpage',
  components: { ChatpageHeader, Chatbar },
  setup() {
    // variables
    const store = useStore()
    const route = useRoute()
    const db = getFirestore()
    let data = ref( JSON.parse(route.params.id))
    let receiverTel = phone(data.value.Tel, {country: 'NG'});
    let chats = ref([])
    const bottom = ref(null)


    // functions
      const sendMessage = async (message) => {
          let text = message[0]
          let senderTel = senderData.value.Tel
          let senderName = senderData.value.Name
          let time = new Date().getTime()
          // first of all add the receiver number to the messages collection

            addDoc(collection(db, "regUsers", senderTel, 'Sentbox'),{
              text: text,
              senderName: senderName,
              senderTel: senderTel,
              receiverTel: receiverTel.phoneNumber,
              timestamp: time
            }).then(() => {
                //console.log('sentbox')
            }).catch((err) => {
                console.log(err)
            })

            await setDoc(doc(db, "regUsers", senderTel, "Connects", receiverTel.phoneNumber), {
              lastMsg: text,
              timestamp: time,
              Name: data.value.Name,
              Tel: data.value.Tel
            });
            store.dispatch('fetchRecentChats')
            // addDoc(collection(db, "regUsers", receiverTel.phoneNumber, 'Inbox'),{
            //   text: text,
            //   senderName: senderName,
            //   senderTel: senderTel,
            //   receiverTel: receiverTel.phoneNumber,
            //   timestamp: time
            // }).then(() => {
            //     //console.log('inbox')
            // }).catch((err) => {
            //     console.log(err)
            // })
      }

      const getChats = async () => {
        let senderTel = senderData.value.Tel
        const q = query(collection(db, "regUsers", senderTel, 'Sentbox'), where("receiverTel", "==", receiverTel.phoneNumber));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                chats.value.push({
                  ...change.doc.data(), 
                  time: dateFormat(new Date(change.doc.data().timestamp), "h:MM TT")
                })
            }
          });
          sortChats()
        });
        
      }

      const getReceivedChats = async () => {
        let senderTel = senderData.value.Tel
        const q = query(collection(db, "regUsers", receiverTel.phoneNumber, 'Sentbox'), where("receiverTel", "==", senderTel));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                chats.value.push({
                  ...change.doc.data(), 
                  time: dateFormat(new Date(change.doc.data().timestamp), "h:MM TT")
                })
            }
          });
          sortChats()
        });
      }

      const loadAllChats = async () => {
          await getChats()
          await getReceivedChats()
      }

      const sortChats = () => {
        chats.value = sortObjectsArray(chats.value, 'timestamp')
        bottom.value?.scrollIntoView({behavior: 'smooth'})
      }

    // computed
    const senderData = computed(() => {
         return store.state.userData
    })

    // set a watcher on the chats to do something with it
    watch(chats, () => {
      bottom.value?.scrollIntoView({behavior: 'smooth'})
    })


    // mounted
    onMounted(async() => {
      loadAllChats()
    })
      

      //sorted = sortObjectsArray(chats.value, 'text');
    

    
      
      
    return { data, senderData, sendMessage, chats, receiverTel, bottom }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";
  
  div.chatpage{
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    background: black;
    color: white;
    padding: 0.5rem;

    div.chatArea{
      overflow: auto;
      padding: 0.5rem;
      height: calc(100vh - 140px);

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
  }
    
</style>

