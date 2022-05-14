// firebase integration
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAMslNE5e5MlGvJ_9PJTuG-rDqp44u0B60",
    authDomain: "whatsapp-clone-8c866.firebaseapp.com",
    projectId: "whatsapp-clone-8c866",
    storageBucket: "whatsapp-clone-8c866.appspot.com",
    messagingSenderId: "199796248167",
    appId: "1:199796248167:web:b8a3c59e3d328badfa4ec2"
  }; 

// Initialize Firebase
initializeApp(firebaseConfig);
import { createStore } from 'vuex'
import sortObjectsArray from 'sort-objects-array'
import { getFirestore, collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
const db = getFirestore()


export default createStore({
  state: {
    userData: null,
    contacts: [],
    recentChats: []
  },
  getters: {
  },
  mutations: {
    updateContacts(state, payload) {
      state.contacts.push(payload)
    },
    updateUserdata(state, payload) {
      state.userData = payload
    },
    updateRecentChats(state, payload) {
      state.recentChats = payload
    }
  },
  actions: {
    async fetchRecentChats({context, commit, state}) {
      const querySnapshot = await getDocs(collection(db, "regUsers", state.userData.Tel, "Connects"));
      let data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
        //data = sortObjectsArray(data, 'timestamp')
      });
      let sorted = sortObjectsArray(data, 'timestamp', 'desc')
      commit('updateRecentChats', sorted)
    }
  },
  modules: {
  }
})

// {'name': ['Airtel'], 'tel': ["08081508537"]},
// {'name': ['Mtn'], 'tel': ["09032422392"]},
// {'name': ['Bose'], 'tel': ["08097102634"]},
// {'name': ['Michael'], 'tel': ["07018860969"]},
// {'name': ['Geeky'], 'tel': ["08097453634"]}