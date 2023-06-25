import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import employees from "./modules/employees";

Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: localStorage,
    }),
  ],
  modules: {
    employees,
  },
});

export default store;
export const useStore = () => store;
