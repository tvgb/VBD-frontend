import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import router from './router'
import store from './store';
import VueCookies from 'vue-cookies'
import 'buefy/dist/buefy.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faTrashAlt, faFileUpload, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt);
library.add(faUser);
library.add(faFileUpload);
library.add(faArrowCircleLeft);

Vue.use(Buefy);
Vue.use(require('vue-moment'));
Vue.use(VueCookies);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
