import { auth } from '@/utils/firebase';
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: undefined,
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    reloadUser({ commit }){
      auth.onAuthStateChanged((user) =>{
        commit("setUser", {
          ...user
        })
        })
    }
  },
  modules: {
  }
})
