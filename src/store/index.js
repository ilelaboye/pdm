import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    endpoint: process.env.VUE_APP_BASE_URL,
    user: null,
    token: "",
    language: "",
    prev_url: null,
    loader: false,
  },
  getters,
  mutations,
  actions,
});

export default store;
