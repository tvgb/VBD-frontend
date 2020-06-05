import repository from '../repository';

const state = {
	vbdAnimals: []
};

const getters = {

};

const endpoint = 'vbdAnimal';

const actions = {

	async getAnimals({ commit }) {
		repository.get(`/${endpoint}/`)
		.then((response) => {
			commit('setVbdAnimals', response.data);
		}).catch(() => {
			
		});
	},

	async submitAnimal({ commit }, { name, image }) {

		return new Promise((resolve, reject) => {

			const formData = new FormData();
			formData.append('name', name);
			formData.append('image', image);

			repository.post(`/${endpoint}/`, formData,
			{
				withCredentials: true
			}
			).then((response) => {
				commit('addVbdAnimal', response.data);
				resolve();
			}).catch((error) => {
				reject();
			});
		});
		
	}
};

const mutations = {
	setVbdAnimals: (state, vbdAnimals) => (state.vbdAnimals = vbdAnimals),
	addVbdAnimal: (state, newVbdAnimal) => (state.vbdAnimals = [...state.vbdAnimals].unshift(newVbdAnimal))
};

export default {
	state,
	getters,
	actions,
	mutations
};