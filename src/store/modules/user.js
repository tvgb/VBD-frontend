import repository from '../repository';
import router from '../../router';
import cookies from 'vue-cookies';
import repo from '../repository';

const state = {
	isAuthenticated: JSON.parse(cookies.get('isAuthenticated')),
	users: [],
	userId: null
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
	},

	async getUserId({ commit }) {

		return new Promise((resolve, reject) => {
			repository.get(`/${endpoint}/cookieuser`,
			{
				withCredentials: true
			}
			).then((response) => {
				commit('setUserId', response.data.userId);
				resolve(response.data.userId);
			}).catch((error) => {
				reject(error);
			});
		});
	},

	async getUsers({ commit }) {
		try {
			const response = await repository.get(`/${endpoint}/`, 
			{
				withCredentials: true
			});

			commit('setUsers', response.data);
		} catch (error) {
			commit('setUsers', []);	
		}
	}
};

const mutations = {
	setIsAuthenticated: (state, value) => (state.isAuthenticated = value),
	setUserId: (state, userId) => (state.userId = userId),
	setUsers: (state, users) => (state.users = users)
};

export default {
	state,
	getters,
	actions,
	mutations
};