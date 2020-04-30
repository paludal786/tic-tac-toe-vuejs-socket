import Vue from 'vue'
import App from './App.vue'

import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import "./vee-validate"
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')