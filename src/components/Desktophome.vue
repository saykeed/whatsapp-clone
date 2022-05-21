<template>
    <div class="desktop" v-if="userData">
        <div class="control">
            <div class="header">
              <div class="headone">
                  <img :src="userData.Photo" alt="dp">
                  <div class="headoneOptions">
                      <i class="material-icons">add_circle_outline</i>
                      <i class="material-icons" @click="toggleDesktopAllRegUsers">message</i>
                      <i class="material-icons" @click="desktopLogout">menu</i>
                  </div>
                  <div class="logoutMenu" v-if="logoutStatus" @click="logoutUser">Logout</div>
              </div>
              <div class="searchBox">
                  <div class="inputWrapper">
                      <i class="material-icons">search</i>
                      <input type="text" >
                  </div>
              </div>
            </div>
            <div class="recentChats" @click="closeLogoutMenu">
                <Desktoprecent 
                  v-for="(contact, index) in recent"
                  :key="contact.index"
                  :contact="contact"
                  @passContactObject="loadChats"
                />
            </div>

            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <DesktopAllRegUsers
                v-if="desktopAllUsersStatus"
                @closeDesktopAllUsers="toggleDesktopAllRegUsers" 
                @setupChat="loadChats"
              />
           </transition>
        </div>
        <div class="chats">
            <Desktopchatpage :data="data" v-if="data" :chats="chats"/>
            <div class="preChats" v-else>
              <img src="@/assets/img/web.png" alt="no there">
            </div>
        </div>
    </div>
</template>

<script>
import Desktoprecent from '@/components/Desktoprecent.vue'
import Desktopchatpage from '@/components/Desktopchatpage.vue'
import DesktopAllRegUsers from '@/components/DesktopAllRegUsers.vue'
import { ref, computed } from 'vue'
import dateFormat, { masks } from "dateformat";
import sortObjectsArray from 'sort-objects-array'
import { useStore } from 'vuex'
import gsap from 'gsap'
import { getFirestore, collection, addDoc, onSnapshot, query, where, setDoc, doc  } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    props: ['userData', 'recent'],
    components: { Desktoprecent, Desktopchatpage, DesktopAllRegUsers },
    setup() {
        // variables
        const data = ref(null)
        let chats = ref([])
        const store = useStore()
        const db = getFirestore()
        const desktopAllUsersStatus = ref(false)
        const logoutStatus = ref(false)
        const auth = getAuth()
        const router = useRouter()

        // functions
        const loadChats = (contact) => {
          chats.value = []
          data.value = contact
          loadAllChats(contact)
        }

        const getChats = async (receiver) => {
          let senderTel = senderData.value.Tel
          const q = query(collection(db, "regUsers", senderTel, 'Sentbox'), where("receiverTel", "==", receiver.Tel));
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

        const getReceivedChats = async (receiver) => {
          let senderTel = senderData.value.Tel
          const q = query(collection(db, "regUsers", receiver.Tel, 'Sentbox'), where("receiverTel", "==", senderTel));
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

        const loadAllChats = async (receiver) => {
            await getChats(receiver)
            await getReceivedChats(receiver)
            //console.log(receiver)
        }

        const sortChats = () => {
          chats.value = sortObjectsArray(chats.value, 'timestamp')
        }

        const toggleDesktopAllRegUsers = () => {
          desktopAllUsersStatus.value = !desktopAllUsersStatus.value;
        }

        const beforeEnter = (el) => {
          el.style.transform = 'translateX(-400px)'
        }

        const enter = (el, done) => {
            gsap.to(el, {
              translateX: 0,
              duration: 0.3,
              onComplete: done
            })
        }

        const leave = (el, done) => {
            gsap.to(el, {
              translateX: -400,
              duration: 0.3,
              onComplete: done
            })
        }

        const desktopLogout = () =>{
          logoutStatus.value = !logoutStatus.value
        }

        const closeLogoutMenu = () => {
          logoutStatus.value = false
        }

        const logoutUser = () => {
            signOut(auth).then(() => {
                logoutStatus.value = false
                router.push('/login')
            }).catch((error) => {
                // An error happened.
                console.log(error)
            });
        }



    // computed
    const senderData = computed(() => {
         return store.state.userData
    })

    

      return { loadChats, data, chats, toggleDesktopAllRegUsers, desktopAllUsersStatus, 
            beforeEnter, enter, leave, desktopLogout, logoutStatus, logoutUser, closeLogoutMenu }  
    
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.desktop{
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100vh;
          width: 100vw;

          div.control{
            min-height: 100vh;
            width: 35%;
            min-width: 300px;
            max-width: 500px;
            border-right: 1px solid rgba(0, 0, 0, 0.138);
            background: white;
            display: flex;
            flex-direction: column;
            position: relative;
            
            div.header{
              height: 110px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.303);
              div.headone{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 0.8rem;
                background: #eae6df;
                position: relative;

                div.logoutMenu{
                  position: absolute;
                  right: 0.8rem;
                  top: 40px;
                  background: white;
                  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.303);
                  width: 130px;
                  line-height: 30px;
                  padding: 0.3rem 1rem;
                  border-radius: 0.3rem;
                  cursor: pointer;
                }

                img{
                  width: 2.5rem;
                  height: 2.5rem;
                  border-radius: 2.5rem;
                  object-fit: cover;
                  object-position: top center;
                }

                div.headoneOptions{
                  i{
                    padding: 0 0.3rem;
                    margin: 0 0.3rem;
                    cursor: pointer;
                  }
                }
              }
              div.searchBox{
                padding: 0.5rem 0.7rem;
                // #eae6df
                div.inputWrapper{
                  background: #eae6df;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  border-radius: 5px;
                  padding: 0.3rem 0.8rem;

                  i{
                    width: 20%;
                  }
                  input{
                    width: 80%;
                    height: 20px;
                    border: none;
                    background: none;
                    outline: none;

                    &:focus{
                      border: none;
                      outline: none;
                    }
                  }
                }
              }
            }

            div.recentChats{
              height: calc(100vh - 110px);
              overflow: auto;
            }
          }
          div.chats{
            min-height: 100vh;
            width: 65%;
            overflow: hidden;
            color: black;
            div.preChats{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100vh;

              img{
                width: 70%;
                object-fit: cover;
              }
            }
          }
        }
</style>