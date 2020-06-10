<template>
	<div class="top-row-container">
		<div class="placement-cell top-row-cell"></div>
		<div class="image-cell top-row-cell"></div>
		<div class="name-cell top-row-cell"></div>
		<div class="score-cell top-row-cell">
			<b-tooltip v-if="!isMobile" label="Vesen" type="is-light" class="score-tooltip toprow-tooltip">
				V
			</b-tooltip>
			<div v-else>
				V
			</div>
		</div>
		<div class="score-cell top-row-cell">
			<b-tooltip v-if="!isMobile" label="Overlevelsesevne" type="is-light" class="score-tooltip toprow-tooltip">
				O
			</b-tooltip>
			<div v-else>
				O
			</div>
		</div>
		<div class="score-cell top-row-cell">
			<b-tooltip v-if="!isMobile" label="X-faktor" type="is-light" class="score-tooltip toprow-tooltip">
				X
			</b-tooltip>
			<div v-else>
				X
			</div>
		</div>
		<div class="score-cell top-row-cell">
			<b-tooltip v-if="!isMobile" label="I kulturen" type="is-light" class="score-tooltip toprow-tooltip">
				K
			</b-tooltip>
			<div v-else>
				K
			</div>
		</div>
		<div class="score-cell top-row-cell">
			<b-tooltip v-if="!isMobile" label="Menneskets beste venn" type="is-light" class="score-tooltip toprow-tooltip">
				M
			</b-tooltip>
			<div v-else>
				M
			</div>
		</div>
		<div class="total-cell top-row-cell">
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

	created() {
		this.isMobile = window.innerWidth < 600;
	}
}
</script>

<style scoped>
	.top-row-container {
		height: 40px;
		display: flex;
	}

	.top-row-cell {
		font-size: 1.4em;
		text-align: center;
		color: #27306A;
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
		width: 70px;
	}

	.image-cell {
		width: 100px;
	}

	.name-cell {
		width: 190px;
	}

	.score-cell {
		width: 40px;
	}

	.total-cell {
		width: 60px;
		color:#80D8C7;
	}

	@media only screen and (max-width: 600px) {
		.top-row-container {
			height: 30px;
		}

		.top-row-cell {
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
		}

		.total-cell {
			padding-right: 5px;
			color:#80D8C7;
		}
			
	}
</style>