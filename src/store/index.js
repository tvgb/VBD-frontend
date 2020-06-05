import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import vbdAnimal from './modules/vbdAnimal';
import cookies from 'vue-cookies';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
	modules: {
		user,
		vbdAnimal
	}
});