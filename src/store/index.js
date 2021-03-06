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
import dateFormat, { masks } from "dateformat";
import { getFirestore, collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
const db = getFirestore()


export default createStore({
  state: {
    userData: null,
    recentChats: [],
    loaderStatus: false,
    welcomeStatus: false,
    errorAlertStatus: false
  },
  getters: {
  },
  mutations: {
    
    updateUserdata(state, payload) {
      state.userData = payload
    },
    updateLoaderStatus(state, payload) {
      state.loaderStatus = payload
    },
    updateRecentChats(state, payload) {
      state.recentChats = payload
    },
    updateWelcomeStatus(state, payload) {
      state.welcomeStatus = payload
    },
    updateErrorAlertStatus(state, payload) {
      state.errorAlertStatus = payload
    },
  },
  actions: {
    async fetchRecentChats({context, commit, state}) {
      const querySnapshot = await getDocs(collection(db, "regUsers", state.userData.Tel, "Connects"));
      let data = []
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(), 
          time: dateFormat(new Date(doc.data().timestamp), "dd/mm/yy h:MM TT")
        })
        //data = sortObjectsArray(data, 'timestamp')
      });
      let sorted = sortObjectsArray(data, 'timestamp', 'desc')
      commit('updateRecentChats', sorted)
    }
  },
  modules: {
  }
})

