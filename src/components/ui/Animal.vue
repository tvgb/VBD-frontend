<template>
	<div class="animal-container">
		<div @click="toggleVoteRow" class="row-container" :class="{cursorPointer: animalType === 'FOLKET'}">
			<div class="placement-cell row-cell"> {{ index + 1}} </div>
			<div class="image-cell row-cell">
				<img class="image" v-bind:src="'data:image/jpeg;base64,' + animal.base64Image" />
			</div>
			<div class="name-cell row-cell"> {{ animal.name }} </div>
			<div class="score-cell row-cell"> {{ animal.vesenScore }} </div>
			<div class="score-cell row-cell"> {{ animal.overlevelsesevneScore }} </div>
			<div class="score-cell row-cell"> {{ animal.xfactorScore }} </div>
			<div class="score-cell row-cell"> {{ animal.ikulturenScore }} </div>
			<div class="score-cell row-cell"> {{ animal.mbvScore }} </div>
			<div class="total-cell row-cell"> {{ animal.totalScore }} </div>
		</div>
		<div v-if="voteExpanded && animalType==='FOLKET'" class="animal-card-spacer" />
		<FolketVote :animal="animal" v-if="voteExpanded" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import FolketVote from './FolketVote';

export default {
	name: 'Animal',

	components: {
		FolketVote
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
			animalType: state => state.animal.animalType
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
		width: 100%;
		margin: 10px 0;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.01), 0 3px 10px 0 rgba(0, 0, 0, 0.05);
		transition: height 1s;
	}

	.row-container {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		color: #27306A;
		padding: 0 10px;
	}

	.cursorPointer {
		cursor: pointer;
	}

	.row-cell {
		font-size: 1.8em;
		text-align: center;
	}

	.placement-cell {
		width: 70px;
		font-size: 70px;
		text-align: center;
		font-weight: 300;	
		padding-left: 5px;
		color:#10352e;
		font-family: 'Barlow', sans-serif;
	}

	.image-cell {
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.name-cell {
		width: 190px;
		text-align: left;
		padding: 10px;
		font-size: 1.5em;
	}

	.score-cell {
		width: 40px;
	}

	.total-cell {
		width: 60px;
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
		margin: 10px;
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

		.score-cell {
			width: 45px;
		}

		.image {
			border-radius: 50%;
			width: 43px;
			height: 43px;
		}

		.placement-cell {
			font-size: 40px;
			padding: 0;
		}
	}
</style>