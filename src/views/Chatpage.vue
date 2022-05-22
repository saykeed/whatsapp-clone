<template>
    <div class="chatpage">
      <ChatpageHeader :data="data"/>
      <Chatbar @sendMessage="sendMessage"/>
        <div class="chatArea">
            <Chatarea :chats="chats" :senderData="senderData" :receiverTel="receiverTel.phoneNumber"/>
        </div>
        
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import ChatpageHeader from '@/components/ChatpageHeader.vue'
import Chatbar from '@/components/Chatbar.vue'
import Chatarea from '@/components/Chatarea.vue'
import {phone} from 'phone';
import { getFirestore, collection, addDoc, onSnapshot, query, where, setDoc, doc  } from "firebase/firestore";
import dateFormat, { masks } from "dateformat";
import sortObjectsArray from 'sort-objects-array'

export default {
  name: 'Chatpage',
  components: { ChatpageHeader, Chatbar, Chatarea },
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
          let senderPhoto = senderData.value.Photo
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
              Tel: data.value.Tel,
              Photo: data.value.Photo
            });
            await setDoc(doc(db, "regUsers", receiverTel.phoneNumber, "Connects", senderTel), {
              lastMsg: text,
              timestamp: time,
              Name: senderName,
              Tel: senderTel,
              Photo: senderPhoto
            });
            // get the most recent chat at display them at the home page
            store.dispatch('fetchRecentChats')

            addDoc(collection(db, "regUsers", receiverTel.phoneNumber, 'Inbox'),{
              text: text,
              senderName: senderName,
              senderTel: senderTel,
              receiverTel: receiverTel.phoneNumber,
              timestamp: time
            }).then(() => {
                //console.log('inbox')
            }).catch((err) => {
                console.log(err)
            })
      }

      const getChats = async () => {
        let senderTel = senderData.value.Tel
        const q = query(collection(db, "regUsers", senderTel, 'Sentbox'), where("receiverTel", "==", receiverTel.phoneNumber));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                chats.value.push({
                  ...change.doc.data(), 
                  time: dateFormat(new Date(change.doc.data().timestamp), "dd/mm/yy h:MM TT")
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
                  time: dateFormat(new Date(change.doc.data().timestamp), "dd/mm/yy h:MM TT")
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

    


    // mounted
    onMounted(async() => {
      loadAllChats()
    })
      

      //sorted = sortObjectsArray(chats.value, 'text');
    

    
      
      
    return { data, senderData, sendMessage, chats, receiverTel, bottom }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
  
  div.chatpage{
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    background: $lightBackground;
    color: white;
    padding: 0.5rem;

    div.chatArea{
      overflow: auto;
      padding: 0.5rem;
      height: calc(100vh - 140px);

    }
  }
    
</style>

