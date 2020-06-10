<template>
	<div class="adminvotepage-container">
		<h1 class="adminvotepage-header">
			Dyr du enda ikke har stemt på:
		</h1>

		<VbdVote v-for="animal in animals" :key="animal._id" :animal="animal"/>
			
		<div v-if="animals.length === 0 && !isLoading" class="no-animals">
			Du har ikke flere dyr igjen å stemme på.
		</div>

		<b-loading :is-full-page="true" :active.sync="isLoading" ></b-loading>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import VbdVote from '../ui/VbdVote';

export default {
	name: 'AdminVotePage',

	components: {
		VbdVote
	},

	data() {
		return {
			userId: null,
			animals: [],
			isLoading: false
		}
	},

	computed: {
		...mapGetters([
			'vbdAnimalsNotVotedFor'
		])
	},

	methods: {
		...mapActions([
			'getVbdAnimals',
			'getUserId'
		])
	},

	created() {
		
		this.isLoading = true;
		this.onMobile = window.innerWidth < 600;

		this.getVbdAnimals().then(() => {
			this.getUserId().then((userId) => {
			this.animals = this.vbdAnimalsNotVotedFor(userId);
			this.isLoading = false;
			});
		})
	}
}
</script>
	
<style scoped>
	.adminvotepage-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.adminvotepage-header {
		text-align: center;
		font-size: 1.5em;
		margin-bottom: 20px;
	}

	.no-animals {
		text-align: center;
	}
</style>