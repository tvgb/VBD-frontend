<template>
	<div class="vbdvoteslist-container">
		<div class="vbdvoteslist" v-for="vote in sortedVotes" :key="vote._id+animal._id">
			<div class="spacer-cell"></div>
			<div class="vbdvote-cell name-cell"> {{ vote.user.firstName }} </div>
			<div class="vbdvote-cell score-cell" :class="{'sortedby': sortedBy === 'vesenScore'}"> {{ vote.vesenScore }} </div>
			<div class="vbdvote-cell score-cell" :class="{'sortedby': sortedBy === 'overlevelsesevneScore'}"> {{ vote.overlevelsesevneScore }} </div>
			<div class="vbdvote-cell score-cell" :class="{'sortedby': sortedBy === 'xfactorScore'}"> {{ vote.xfactorScore }} </div>
			<div class="vbdvote-cell score-cell" :class="{'sortedby': sortedBy === 'ikulturenScore'}"> {{ vote.ikulturenScore }} </div>
			<div class="vbdvote-cell score-cell" :class="{'sortedby': sortedBy === 'mbvScore'}"> {{ vote.mbvScore }} </div>
			<div class="vbdvote-cell total-cell" :class="{'sortedby': sortedBy === 'totalScore'}"> {{ vote.totalScore }} </div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'VbdVotesList',

	props: [
		'animal'
	],

	computed: {
		...mapState({
			sortedBy: state => state.animal.sortedBy
		}),

		sortedVotes() {
			let sortedVotes = [...this.animal.votes];

			for (const vote of sortedVotes) {
				vote.totalScore = vote.vesenScore + vote.overlevelsesevneScore + vote.xfactorScore + vote.ikulturenScore + vote.mbvScore;
			}

			switch(this.sortedBy) {
				case 'vesenScore':
					sortedVotes.sort((a, b) =>  b.vesenScore - a.vesenScore);
					break;

				case 'overlevelsesevneScore':
					sortedVotes.sort((a, b) =>  b.overlevelsesevneScore - a.overlevelsesevneScore);
					break;

				case 'xfactorScore':
					sortedVotes.sort((a, b) =>  b.xfactorScore - a.xfactorScore);
					break;

				case 'ikulturenScore':
					sortedVotes.sort((a, b) =>  b.ikulturenScore - a.ikulturenScore);
					break;

				case 'mbvScore':
					sortedVotes.sort((a, b) =>  b.mbvScore - a.mbvScore);
					break;

				default:
					sortedVotes.sort((a, b) =>  b.totalScore - a.totalScore);
			}

			return sortedVotes;
		}
	}
}
</script>

<style scoped>
	.vbdvoteslist-container {
		width: 100%;
	}

	.vbdvoteslist {
		display: flex;
		align-items: center;
		height: 40px;
	}

	.vbdvote-cell {
		color: #27306A;
		height: fit-content;
		text-align: center;
		font-size: 1.3em;
	}

	.spacer-cell {
		width: 27%;
	}

	.name-cell {
		width: 33%;
		padding-left: 2%;
		text-align: left;
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

	@media only screen and (max-width: 600px) {
		.vbdvoteslist {
			height: 30px;
		}

		.vbdvote-cell {
			font-size: 0.8em;
		}		
	}
</style>