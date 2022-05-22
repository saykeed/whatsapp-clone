<template>
    <div class="searchUser">
        <div class="searchOverlay" @click="closeSearch"></div>
        <div class="searchInput">
            <div class="searchHead">
                <i class="material-icons" @click="closeSearch">arrow_back</i>
                <input type="text" v-model="searchTerm" @input="findContact" placeholder="Search...">
            </div>
            <div class="searchParameters" v-if="searchParametersStaus">
                <ul>
                    <li><i class="material-icons">photo</i> Photos</li>
                    <li><i class="material-icons">videocam</i> Videos</li>
                    <li><i class="material-icons">link</i> Links</li>
                    <li><i class="material-icons">gif</i> GIFs</li>
                    <li><i class="material-icons">headset</i> Audio</li>
                    <li><i class="material-icons">library_books</i> Documents</li>
                </ul>
            </div>
        </div>
        <div class="searchResult" v-if="filteredSearch" @click="closeSearch">
            <Eachcontact 
              v-for="(contact, index) in filteredSearch"
              :key="contact.index"
              :contact="contact"
            />
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Eachcontact from '@/components/Eachcontact.vue'

export default {
    components: { Eachcontact },
    setup(props, { emit }) {
        // variables
        const searchTerm = ref(null)
        const db = getFirestore()
        const searchResult = ref([])
        const router = useRouter()
        const store = useStore()
        const recents = ref([])
        const filteredSearch = ref(recents.value)
        const searchParametersStaus = ref(true)
        

        // functions
        const closeSearch = () => {
            emit('closeSearchUser')
        }

        const loadAllRecentChats = async () => {
            const querySnapshot = await getDocs(collection(db, "regUsers", userData.value.Tel, "Connects"));
            querySnapshot.forEach((doc) => {
                recents.value.push(doc.data())
            });
        }

        const findContact = () => {
            if(searchTerm.value) {
                searchParametersStaus.value = false;
                filteredSearch.value = recents.value.filter((item) => {
                    return item.Name.includes(searchTerm.value)
                })
                console.log(filteredSearch.value)
            } else {
                searchParametersStaus.value = true;
                filteredSearch.value = recents.value
            }
        }


        // computed
        const userData = computed(() => {
            return store.state.userData
        })

        // mounted
        onMounted(() => {
            loadAllRecentChats()
        })

      return { searchTerm, closeSearch, recents, findContact, filteredSearch, searchParametersStaus}
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.searchUser{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;

        div.searchOverlay{
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
        }

        div.searchInput{
            width: 100%;
            box-shadow: 2px 2px 3px black;
            padding: 1rem;
            background: white;
            z-index: 9;

            div.searchHead{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.159);

                i{
                    color: rgba(0, 0, 0, 0.761);
                    margin-right: 20px;
                    cursor: pointer;
                }

                input{
                    width: 100%;
                    border: none;
                    outline: none;
                    height: 30px;
                    padding: 10px;

                    &:focus{
                        border: none;
                        outline: none;
                    }
                }
            }

            div.searchParameters{ 
                ul{
                    display: flex;
                    flex-wrap: wrap;

                    li{
                        list-style-type: none;
                        padding: 0.4rem;
                        margin: 0.5rem;
                        border-radius: 1rem;
                        background: rgba(0, 0, 0, 0.179);
                        cursor: pointer;
                        font-size: 0.8rem;

                        i{
                            font-size: 1.1rem;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        div.searchResult{
            width: 100%;
            height: 100%;
            overflow: auto;
            z-index: 9;
            background: white;
        }
    }
</style>