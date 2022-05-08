import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: []
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
