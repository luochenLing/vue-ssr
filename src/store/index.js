import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login/index";
import user from "./modules/user/index";

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: {
      login,
      user
    }
  });
}
