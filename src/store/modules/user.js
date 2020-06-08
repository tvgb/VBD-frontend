import repository from '../repository';
import router from '../../router';
import cookies from 'vue-cookies';
import repo from '../repository';

const state = {
	isAuthenticated: JSON.parse(cookies.get('isAuthenticated'))
};

const getters = {

};

const endpoint = 'user';

const actions = {

	async login({ commit }, {email, password}) {
		return new Promise((resolve, reject) => {
			repository.post(`/${endpoint}/login`,
			{
				email: email,
				password: password
			},
			{
				withCredentials: true
			}
			).then((response) => {
				commit('setIsAuthenticated', true);
				resolve();
				router.push(router.currentRoute.query.redirect || '/nyttdyr');
			}).catch((error) => {
				if (error.response.status === 400) {
					commit('setIsAuthenticated', false);
				}
				reject();
			});
		});
		
	},

	logout({ commit }) {
		cookies.remove('access_token');
		cookies.remove('isAuthenticated');
		commit('setIsAuthenticated', false);

		if (router.currentRoute.path !== '/') {
			router.push('/');
		}
	},

	async changePassword({ commit }, {newPassword, oldPassword}) {
		return new Promise((resolve, reject) => {
			repository.put(`/${endpoint}/changePassword`, 
			{
				newPassword: newPassword,
				oldPassword: oldPassword
			},
			{
				withCredentials: true
			}
			).then(() => {
				resolve();
			}).catch((error) => {
				reject(error);
			});
		});
	}
};

const mutations = {
	setIsAuthenticated: (state, value) => (state.isAuthenticated = value)
};

export default {
	state,
	getters,
	actions,
	mutations
};