import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate  from 'vuelidate'
import dateFilter from './filters/date.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { } from 'firebase/database';

Vue.config.productionTip = false

// vue.use() - регистрация подключаемого плагина
// https://www.programmersought.com/article/20121750933/
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

initializeApp({
  apiKey: "AIzaSyBbmpy4klLJX6wu9wQQBsu0WMqm6SrNJpg",
  authDomain: "vue-crm-cbccb.firebaseapp.com",
  projectId: "vue-crm-cbccb",
  storageBucket: "vue-crm-cbccb.appspot.com",
  messagingSenderId: "80000757125",
  appId: "1:80000757125:web:14ddd484e4c81bbee168ec"
})

let app
// наблюдатель состояния аутентификации
// // Если в firebase мы прошли аутентификацию, то инициализируем приложение Vue
onAuthStateChanged( getAuth(), () => {
  if  (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
