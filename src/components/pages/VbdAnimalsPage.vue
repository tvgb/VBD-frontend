<template>
	<div class="container">
		
	</div>
</template>

<script>
import VbdAnimal from '../ui/VbdAnimal';
import { mapActions, mapState } from 'vuex';

export default {
	name: 'VbdAnimalsPage',

	methods: {
		...mapActions([
			'getAnimals'
		])
	},

	computed: {
		...mapState({
			vbdAnimals: state => state.vbdAnimal.vbdAnimals
		})
	},

	created() {
		this.getAnimals()
	}

}
</script>

<style scoped>
	.container {
		widows: 600px;
		padding: 20px;
	}

	@media only screen and (max-width: 600px) {
		.container {
			width: 100%;
		}
	}
</style>