import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Chatpage from '../views/Chatpage.vue'
import Allcontact from '../views/Allcontact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/chatpage/:id',
    name: 'Chatpage',
    component: Chatpage
  },
  {
    path: '/allcontact',
    name: 'Allcontact',
    component: Allcontact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
