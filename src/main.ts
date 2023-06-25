import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/bootstrap";
import "./styles/main.css";
import { BootstrapVue } from "bootstrap-vue";
import vueDebounce from "vue-debounce";
import ymapPlugin from "vue-yandex-maps";

Vue.config.productionTip = false;

Vue.use(ymapPlugin).use(BootstrapVue).use(vueDebounce);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
