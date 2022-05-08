import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: ['first contact']
  },
  getters: {
  },
  mutations: {
    updateContacts(state, payload) {
      state.contacts.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
