import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: [
      {'name': ['Adeyemi'], 'tel': ["08097453634"]},
      {'name': ['Afolai'], 'tel': ["08097453634"]},
      {'name': ['Bose'], 'tel': ["08097453634"]},
      {'name': ['Michael'], 'tel': ["08097453634"]},
      {'name': ['Geeky'], 'tel': ["08097453634"]}
    ]
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
