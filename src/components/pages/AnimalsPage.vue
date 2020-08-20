<template>
	<div class="outer-container">

		<TopNavigation class="topnavigation" :initialSelection="animalType"/>
		<h2 v-if="animalType === 'FOLKET'" class="info">
			På denne siden kan du stemme på ditt favorittdyr. Trykk på dyret du ønsker å stemme på 
			og gi en verdi fra 0 til 20 for hver kategori.
		</h2>
		<h2 v-else class="info">
			Her kan du se en oversikt over stemmene gitt i podkasten til hvert av dyrene. Du kan
			trykke på et dyr for å se de ulike stemmene.
		</h2>
		<div v-if="noInfoText" class="noInfoTextSpacer">

		</div>

		<div class="animals-container">
			<TopRow v-if="sortedAnimals(animalType).length > 0" />

			<div v-else-if="!isLoading" class="no-animals-div">
				Ingen dyr har blitt registrert enda.
			</div>

			<Animal 
				v-for="(animal, index) in sortedAnimals(animalType, sortedBy)"
				:key="animal._id"
				:animal="animal"
				:index="index" />

			<b-loading :is-full-page="true" :active.sync="isLoading" ></b-loading>
		</div>
	</div>
	
</template>

<script>
import Animal from '../ui/Animal';
import TopNavigation from '../ui/TopNavigation';
import TopRow from '../ui/TopRow';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
	name: 'AnimalsPage',

	components: {
		Animal,
		TopNavigation,
		TopRow
	},

	data() {
		return {
			isLoading: false,
			aniamls: [],
			noInfoText: true
		}
	},

	methods: {
		...mapActions([
			'getVbdAnimals',
			'getFolketAnimals'
		])
	},

	computed: {
		...mapState({
			animalType: state => state.animal.animalType,
			sortedBy: state => state.animal.sortedBy
		}),

		...mapGetters([
			'sortedAnimals'
		])
	},

	created() {
		this.isLoading = true;
		this.getVbdAnimals().then(() => {
			if (this.animalType === 'VBD') {
				this.isLoading = false;
			}
		});

		this.getFolketAnimals().then(() => {
			if (this.animalType === 'FOLKET') {
				this.isLoading = false;
			}
		});
	}
}
</script>

<style scoped>
	.outer-container {
		display: flex;
		flex-direction: column;	
		align-items: center;
	}

	.animals-container {
		width: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.topnavigation {
		margin-bottom: 10px;
	}

	.no-animals-div {
		text-align: center;
	}

	.info {
		font-size: 0.9em;
		font-weight: 300;
		height: 42px;
		width: 610px;
	}

	.spacer {
		height: 62px;
	}

	.noInfoTextSpacer {
		height: 30px;
	}

	.vbd-header {
		font-size: 2em;
		font-weight: 300;
		margin: 0 0 5px 0;
		color: #27306A;
	}

	@media only screen and (max-width: 600px) {
		.animals-container {
			width: 90%;
			align-items: stretch;
		}

		.info {
			font-size: 0.8em;
			font-weight: 300;
			margin-bottom: 20px;
			width: 90%;
		}

		.noInfoTextSpacer {
			height: 10px;
		}
	}
</style>