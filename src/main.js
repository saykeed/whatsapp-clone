import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.css'

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

createApp(App).use(store).use(router).mount('#app')
