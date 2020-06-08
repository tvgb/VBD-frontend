<template>
	<div class="top-row-container">
		<div class="placement-cell top-row-cell"></div>
		<div class="image-cell top-row-cell"></div>
		<div class="name-cell top-row-cell"></div>
		<div class="score-cell top-row-cell">V</div>
		<div class="score-cell top-row-cell">F/A</div>
		<div class="score-cell top-row-cell">X</div>
		<div class="score-cell top-row-cell">K</div>
		<div class="score-cell top-row-cell">M</div>
		<div class="total-cell top-row-cell">&Sigma;</div>
	</div>
</template>

<script>
export default {
	name: 'TopRow'
}
</script>

<style scoped>
	.top-row-container {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	.top-row-cell {
		font-size: 1.4em;
		text-align: center;
		color: #27306A;
	}

	.placement-cell {
		width: 70px;
	}

	.name-cell {
		width: 190px;
	}

	.image-cell {
		width: 100px;
	}

	.score-cell {
		width: 40px;
	}

	.total-cell {
		width: 60px;
		color:#80D8C7;
	}

	@media only screen and (max-width: 600px) {
		.top-row-cell {
			font-size: 1em;
		}
	}
</style>