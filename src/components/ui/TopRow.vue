<template>
	<div class="top-row-container">
		<div class="placement-cell top-row-cell"></div>
		<div class="image-cell top-row-cell"></div>
		<div class="name-cell top-row-cell"></div>
		<div @click="setSortedBy('vesenScore')" class="score-cell top-row-cell" :class="{'sortedby': sortedBy === 'vesenScore'}">
			<b-tooltip v-if="!isMobile" label="Vesen" type="is-light" class="score-tooltip toprow-tooltip">
				V
			</b-tooltip>
			<div v-else>
				V
			</div>
		</div>
		<div @click="setSortedBy('overlevelsesevneScore')" class="score-cell top-row-cell" :class="{'sortedby': sortedBy === 'overlevelsesevneScore'}">
			<b-tooltip v-if="!isMobile" label="Overlevelsesevne" type="is-light" class="score-tooltip toprow-tooltip">
				O
			</b-tooltip>
			<div v-else>
				O
			</div>
		</div>
		<div @click="setSortedBy('xfactorScore')" class="score-cell top-row-cell" :class="{'sortedby': sortedBy === 'xfactorScore'}">
			<b-tooltip v-if="!isMobile" label="X-faktor" type="is-light" class="score-tooltip toprow-tooltip">
				X
			</b-tooltip>
			<div v-else>
				X
			</div>
		</div>
		<div @click="setSortedBy('ikulturenScore')" class="score-cell top-row-cell" :class="{'sortedby': sortedBy === 'ikulturenScore'}">
			<b-tooltip v-if="!isMobile" label="I kulturen" type="is-light" class="score-tooltip toprow-tooltip">
				K
			</b-tooltip>
			<div v-else>
				K
			</div>
		</div>
		<div @click="setSortedBy('mbvScore')" class="score-cell top-row-cell" :class="{'sortedby': sortedBy === 'mbvScore'}">
			<b-tooltip v-if="!isMobile" label="Menneskets beste venn" type="is-light" class="score-tooltip toprow-tooltip">
				M
			</b-tooltip>
			<div v-else>
				M
			</div>
		</div>
		<div @click="setSortedBy('totalScore')" class="total-cell top-row-cell" :class="{'sortedby': sortedBy === 'totalScore'}">
			<b-tooltip v-if="!isMobile" label="Total sum" type="is-light" class="total-tooltip toprow-tooltip">
				&Sigma;
			</b-tooltip>
			<div v-else>
				&Sigma;	
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	name: 'TopRow',

	props: [
		'animalType'
	],

	data() {
		return {
			isMobile: null
		}
	},

	computed: {
		...mapState({
			sortedBy: state => state.animal.sortedBy
		})
	},

	methods: {
		...mapMutations([
			'setSortedBy'
		])
	},

	created() {
		this.isMobile = window.innerWidth < 600;
	}
}
</script>

<style scoped>
	.top-row-container {
		height: 40px;
		width: 100%;
		display: flex;
	}

	.top-row-cell {
		font-size: 1.4em;
		text-align: center;
		color: #27306A;
		cursor: pointer;
	}

	.toprow-tooltip {
		text-align: center;
	}

	.toprow-tooltip::after {
		background-color: #80D8C7;
		color: white;
	}

	.toprow-tooltip::before {
		border-top: 5px solid #80D8C7 !important;
		border-right: 5px solid transparent !important;
		border-left: 5px solid transparent !important;
		bottom: calc(100% + 2px) !important;
	}

	.placement-cell {
		width: 10%;
	}

	.image-cell {
		width: 17%;
	}

	.name-cell {
		width: 33%;
	}

	.score-cell {
		width: 6%;
	}

	.total-cell {
		width: 10%
	}

	.sortedby {
		color:#80D8C7;
	}

	@media only screen and (max-width: 600px) {
		.top-row-container {
			height: 30px;
		}

		.top-row-cell {
			font-size: 1em;
		}

		.image {
			width: 43px;
			height: 43px;
		}
	}
</style>