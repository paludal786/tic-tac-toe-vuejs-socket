// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import "./vee-validate"
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

window.Event = new Vue()

// Vue.use(VueRouter);
// let router = new VueRouter({
//     routes: Routers,
//     mode: 'history'
// });

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})