<template>
	<div class="outer-container">
		<div class="animals-container">
			<!-- <h1 class="vbd-header">
				VERDENS BESTE DYR
			</h1> -->
			<TopNavigation :initialSelection="animalType"/>
			<div class="spacer"/>
			<TopRow />

			<Animal 
				v-for="(animal, index) in sortedAnimals(animalType)"
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
		TopRow,
	},

	data() {
		return {
			isLoading: false
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
			animalType: state => state.animal.animalType
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
		width: 660px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.spacer {
		height: 10px;
	}

	.vbd-header {
		font-size: 2em;
		font-weight: 300;
		margin: 0 0 15px 0;
		color: #27306A;
	}

	@media only screen and (max-width: 600px) {
		.animals-container {
			width: 100%;
		}
	}
</style>