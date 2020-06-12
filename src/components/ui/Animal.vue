<template>
	<div class="animal-container">
		<div @click="toggleVoteRow" class="row-container">
			<div class="placement-cell row-cell"> {{ index + 1}} </div>
			<div class="image-cell row-cell">
				<img class="image" v-bind:src="'data:image/jpeg;base64,' + animal.base64Image" />
			</div>
			<div class="name-cell row-cell"> 
				<div v-if="animalType==='FOLKET'" class="name-spacer-div">

				</div>
				<div class="name-div">
					{{ animal.name }} 
				</div>
				<div v-if="animalType==='FOLKET'" class="votes-div">
					Stemmer: {{ animal.votes.length }}
				</div>
			</div>
			<div class="score-cell row-cell" :class="{'sortedby': sortedBy === 'vesenScore'}"> {{ animal.vesenScore }} </div>
			<div class="score-cell row-cell" :class="{'sortedby': sortedBy === 'overlevelsesevneScore'}"> {{ animal.overlevelsesevneScore }} </div>
			<div class="score-cell row-cell" :class="{'sortedby': sortedBy === 'xfactorScore'}"> {{ animal.xfactorScore }} </div>
			<div class="score-cell row-cell" :class="{'sortedby': sortedBy === 'ikulturenScore'}"> {{ animal.ikulturenScore }} </div>
			<div class="score-cell row-cell" :class="{'sortedby': sortedBy === 'mbvScore'}"> {{ animal.mbvScore }} </div>
			<div class="total-cell row-cell" :class="{'sortedby': sortedBy === 'totalScore'}"> {{ animal.totalScore }} </div>
		</div>

		<!-- Shown if folket vote is selected -->
		<div v-if="voteExpanded && animalType==='FOLKET'" class="animal-card-spacer" />
		<FolketVote :animal="animal" v-if="voteExpanded && animalType==='FOLKET'" />

		<!-- Shown if vbd vote is selected -->
		<div v-if="voteExpanded && animalType==='VBD'" class="animal-card-spacer" />
		<VbdVotesList :animal="animal" v-if="voteExpanded && animalType==='VBD'" />

	</div>
</template>

<script>
import { mapState } from 'vuex';
import FolketVote from './FolketVote';
import VbdVotesList from './VbdVotesList';

export default {
	name: 'Animal',

	components: {
		FolketVote,
		VbdVotesList
	},

	props: [
		'animal',
		'index'
	],

	data() {
		return {
			voteExpanded: false
		}
	},

	computed: {
		...mapState({
			animalType: state => state.animal.animalType,
			sortedBy: state =>  state.animal.sortedBy
		})
	},

	methods: {
		toggleVoteRow() {
			this.voteExpanded = !this.voteExpanded;
		}
	}
}
</script>

<style scoped>
	.animal-container {
		margin: 10px 0;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.01), 0 3px 10px 0 rgba(0, 0, 0, 0.05);
		width: 100%;
	}

	.row-container {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		color: #27306A;
		cursor: pointer;
	}

	.row-cell {
		font-size: 1.8em;
		text-align: center;
	}

	.placement-cell {
		width: 10%;
		font-size: 70px;
		text-align: center;
		font-weight: 300;	
		color:#10352e;
		font-family: 'Barlow', sans-serif;
		padding-left: 3%;
	}

	.image-cell {
		width: 17%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.name-cell {
		width: 33%;
		text-align: left;
		font-size: 1.8em;
		padding-left: 2%;
	}

	.name-spacer-div {
		height: 18px;
	}

	.votes-div {
		font-size: 0.5em;
	}

	.score-cell {
		width: 6%;
	}

	.total-cell {
		width: 10%;
	}

	.sortedby {
		color:#80D8C7;
	}

	.image {
		border-radius: 50%;
		width: 70px;
		height: 70px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1);
	}

	.animal-card-spacer {
		border-bottom: solid 1px #EFEFEF;
		margin: 0 10px;
	}

	@media only screen and (max-width: 600px) {
		.animal-container {
			margin: 0 0 10px 0;
		}
		
		.row-container {
			height: 60px;
		}
		

		.row-cell {
			font-size: 1em;
		}
		

		.placement-cell {
			font-size: 40px;
			padding-left: 5px;
		}
		

		.image {
			border-radius: 50%;
			width: 43px;
			height: 43px;
		}
	}
</style>