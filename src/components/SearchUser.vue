<template>
    <div class="searchUser">
        <input type="text" @input="searchForRegUser" placeholder="search by Username" v-model="searchTerm">
        <div class="result" v-if="searchTerm">
            <ul v-if="searchResult.length">
                <li
                 v-for="user in searchResult"
                 :key="user.Tel"
                 @click="addUser(user)"
                >
                    <p class="name">{{ user.Name }}</p>
                    <p class="tel">{{ user.Tel }}</p>
                </li>
            </ul>
            <p v-else>There is no match for your input</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from 'vue-router'

export default {
    setup() {
        // variables
        const searchTerm = ref(null)
        const db = getFirestore()
        const searchResult = ref([])
        const router = useRouter()

        // functions
        const searchForRegUser = async () => {
            searchResult.value = []
            if (searchTerm.value) {
                //alert(searchTerm.value)
                const q = query(collection(db, "regUsers"), where("Name", "==", searchTerm.value));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    searchResult.value.push(doc.data())
                });
            }
        }
        const addUser = (user) => {
            router.push({
                name: 'Chatpage',
                params: {
                    id: JSON.stringify(user)
                }
            })
        }

      return { searchTerm, searchForRegUser, searchResult, addUser }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.searchUser{
        padding: 0.5rem;

        input{
            width: 100%;
            height: 40px;
            border-radius: 1.5rem;
            padding: 1rem;
            background: $headerBackground;
            border: none;
            
            &:focus{
                outline: none;
                border: 2px solid $whatsappGreen;
                background: none;
                color: white;
            }
        }

        div.result{
            margin: 0.5rem auto;
            background: white;
            padding: 0.5rem;
            border-radius: 10px;
            max-height: 250px;
            overflow: auto;

            ul{
                text-align: left;

                li{
                    list-style-type: none;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.529);;

                    &:last-child{
                        border: none;
                    }

                    p.name{
                        color: Black;
                        font-size: 1.2rem;
                    }
                    p.tel{
                        color: $whatsappGreen;
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>