import repository from '../repository';

const state = {
	vbdAnimals: [],
	folketAnimals: [],
	registeredVotes: JSON.parse(localStorage.getItem('registeredVotes')) || [],
	animalType: localStorage.getItem('animalType') || 'VBD'
};

const getters = {
	sortedAnimals: (state) => (type) => {
		let sortedAnimals = null;

		if (type === 'VBD') {
			sortedAnimals = [...state.vbdAnimals];
		} else if (type === 'FOLKET') {
			sortedAnimals = [...state.folketAnimals];
		}

		for (const animal of sortedAnimals) {

			let vesenScore = 0;
			let overlevelsesevneScore = 0;
			let xfactorScore = 0;
			let ikulturenScore = 0;
			let mbvScore = 0;

			for (const vote of animal.votes) {
				vesenScore += vote.vesenScore;
				overlevelsesevneScore += vote.overlevelsesevneScore;
				xfactorScore += vote.xfactorScore;
				ikulturenScore += vote.ikulturenScore; 
				mbvScore += vote.mbvScore;
			}

			const numberOfvotes = Math.max(animal.votes.length, 1);

			animal.vesenScore = Math.round(vesenScore / numberOfvotes);
			animal.overlevelsesevneScore = Math.round(overlevelsesevneScore / numberOfvotes);
			animal.xfactorScore = Math.round(xfactorScore / numberOfvotes);
			animal.ikulturenScore = Math.round(ikulturenScore / numberOfvotes);
			animal.mbvScore = Math.round(mbvScore / numberOfvotes);
			animal.totalScore = Math.round((animal.vesenScore + animal.overlevelsesevneScore + animal.xfactorScore + animal.ikulturenScore + animal.mbvScore) / numberOfvotes);
		}

		sortedAnimals.sort((a, b) =>  b.totalScore - a.totalScore);
		return sortedAnimals;
	},

	voteRegistered: (state) => (animalId) => {
		for (const registeredAnimalId of state.registeredVotes) {
			if (animalId === registeredAnimalId) {
				return true;
			}
		}

		return false;
	}
};

const endpoint = 'animal';

const actions = {

	async getVbdAnimals({ commit, getters }) {
		return new Promise((resolve, reject) => {
			repository.get(`/${endpoint}/vbd`)
			.then((response) => {
				commit('setVbdAnimals', response.data);
				resolve(getters.sortedAnimals('VBD'));
			}).catch(() => {
				reject();
			});
		});
	},

	async getFolketAnimals({ commit }) {
		return new Promise((resolve, reject) => {
			repository.get(`/${endpoint}/folket`)
			.then((response) => {
				commit('setFolketAnimals', response.data);
				resolve();
			}).catch(() => {
				reject();
			});
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
			).then(() => {
				resolve();
			}).catch(() => {
				reject();
			});
		});
	},

	async registerFolketVote({ commit }, { bfp, animalId, vesenScore, overlevelsesevneScore, xfactorScore, ikulturenScore, mbvScore }) {
		return new Promise((resolve, reject) => {
			repository.post(`/${endpoint}/votefolket`, 
				{
					bfp: bfp,
					animalId: animalId,
					vesenScore: vesenScore,
					overlevelsesevneScore: overlevelsesevneScore,
					xfactorScore: xfactorScore,
					ikulturenScore: ikulturenScore,
					mbvScore: mbvScore
				}
			).then((response) => {
				const newVote = response.data.newVote;
				const animalId = response.data.animalId;
				commit('updateFolketAnimals', { newVote, animalId } );
				resolve();
			}).catch((error) => {
				if (error.response.status === 406) {
					commit('updateRegisteredVotes', animalId);
				}
				reject(error);
			});
		})
	}
};

const mutations = {
	setVbdAnimals (state, vbdAnimals) {
		state.vbdAnimals = vbdAnimals;
	},
	setFolketAnimals (state, folketAnimals) {
		state.folketAnimals = folketAnimals;
	},
	updateFolketAnimals (state, {newVote, animalId}) {
		state.registeredVotes.push(animalId);
		localStorage.setItem('registeredVotes', JSON.stringify(state.registeredVotes));

		for (const animal of state.folketAnimals) {
			if (animal._id === animalId) {
				animal.votes.push(newVote);
				break;
			}
		}
	},
	setAnimalType (state, type) { 
		state.animalType = type;
		localStorage.setItem('animalType', state.animalType);
	},
	updateRegisteredVotes (state, animalId) {
		for (const registeredAnimalId of state.registeredVotes) {
			if (registeredAnimalId === animalId) {
				return;
			}
		}
		state.registeredVotes.push(animalId);
		localStorage.setItem('registeredVotes', JSON.stringify(state.registeredVotes));
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};