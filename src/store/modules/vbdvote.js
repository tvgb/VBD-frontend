import repository from '../repository';

const state = {

};

const getters = {
	sortedVbdVotes: (state) => (type, sortedBy) => {
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
			animal.totalScore = animal.vesenScore + animal.overlevelsesevneScore + animal.xfactorScore + animal.ikulturenScore + animal.mbvScore;
		}

		switch(sortedBy) {
			case 'vesenScore':
				sortedAnimals.sort((a, b) =>  b.vesenScore - a.vesenScore);
				break;

			case 'overlevelsesevneScore':
				sortedAnimals.sort((a, b) =>  b.overlevelsesevneScore - a.overlevelsesevneScore);
				break;

			case 'xfactorScore':
				sortedAnimals.sort((a, b) =>  b.xfactorScore - a.xfactorScore);
				break;

			case 'ikulturenScore':
				sortedAnimals.sort((a, b) =>  b.ikulturenScore - a.ikulturenScore);
				break;

			case 'mbvScore':
				sortedAnimals.sort((a, b) =>  b.mbvScore - a.mbvScore);
				break;

			default:
				sortedAnimals.sort((a, b) =>  b.totalScore - a.totalScore);
		}

		return sortedAnimals;
	}
};

const actions = {

};

const mutations = {

};

export default {
	state,
	getters,
	actions,
	mutations
};