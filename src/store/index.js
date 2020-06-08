import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import animal from './modules/animal';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
	modules: {
		user,
		animal
	}
});