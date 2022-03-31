import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: {
      mainInfo: "",
      address: "",
      passport: "",
    },
  },
  mutations: {
    PUT_CLIENT(state, client) {
      state.clients.mainInfo = client;
    },
    PUT_ADDRESS(state, address) {
      state.clients.address = address;
    },
    PUT_PASSPORT(state, passport) {
      state.clients.passport = passport;
    },
  },
  actions: {
    SET_CLIENT({ commit }, client) {
      commit("PUT_CLIENT", client);
    },
    SET_ADDRESS({ commit }, address) {
      commit("PUT_ADDRESS", address);
    },
    SET_PASSPORT({ commit }, passport) {
      commit("PUT_PASSPORT", passport);
    },
  },
  modules: {},
});
