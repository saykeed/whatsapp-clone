<template>
    <div class="desktopchatbar">
        <i class="material-icons">tag_faces</i>
        <i class="material-icons">attachment</i>
        <input type="text" v-model="message">
        <i class="material-icons" @click="sendMessage">send</i>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { getFirestore, collection, addDoc, onSnapshot, query, where, setDoc, doc  } from "firebase/firestore";

export default {
    props: ['senderData', 'receiver'],
    setup(props) {
        // variables
        const message = ref(null)
        const store = useStore()
        const db = getFirestore()

        // functions
        const sendMessage = () => {
            if(message.value) {
                sendMessageToDB(message.value)
                message.value = null
            }
        }

        const sendMessageToDB = async (message) => {
            let text = message
            let senderTel = props.senderData.Tel
            let senderName = props.senderData.Name
            let senderPhoto = props.senderData.Photo
            let time = new Date().getTime()
            let receiver = props.receiver

            // put this message in the sender's sentbox
            addDoc(collection(db, "regUsers", senderTel, 'Sentbox'),{
              text: text,
              senderName: senderName,
              senderTel: senderTel,
              receiverTel: receiver.Tel,
              timestamp: time
            }).then(() => {
                //console.log('sentbox')
            }).catch((err) => {
                console.log(err)
            })
            // put this same message in th sender's conneccts
            await setDoc(doc(db, "regUsers", senderTel, "Connects", receiver.Tel), {
              lastMsg: text,
              timestamp: time,
              Name: receiver.Name,
              Tel: receiver.Tel,
              Photo: receiver.Photo
            });
            // put this same message in the receiver's connects
            await setDoc(doc(db, "regUsers", receiver.Tel, "Connects", senderTel), {
              lastMsg: text,
              timestamp: time,
              Name: senderName,
              Tel: senderTel,
              Photo: senderPhoto
            });
            // get the most recent chat at display them at the home page
            store.dispatch('fetchRecentChats')

            // put this same message in the receiver's inbox
            addDoc(collection(db, "regUsers", receiver.Tel, 'Inbox'),{
              text: text,
              senderName: senderName,
              senderTel: senderTel,
              receiverTel: receiver.Tel,
              timestamp: time
            }).then(() => {
                //console.log('inbox')
            }).catch((err) => {
                console.log(err)
            })
        }

      return { sendMessage, message }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.desktopchatbar{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 50px;

        i{
            cursor: pointer;
        }
        
        input{
            width: 70%;
            height: 70%;
            border: none;
            outline:none;
            border-radius: 5px;
            padding: 0.5rem;
            
            &:focus{
                border: none;
                outline: none;
            }
        }
    }

</style>