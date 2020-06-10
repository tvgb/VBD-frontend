<template>
	<div class="vbdvote-container">
		<div class="animalname-div">
			{{ animal.name }}
		</div>
		<div v-if="!voteRegistered" class="inputs-container">
			<div class="score-input-container">
				<div v-if="!onMobile" class="score-input-label">
					Vesen
				</div>
				<div v-if="onMobile" class="score-input-label">
					V
				</div>
				<b-input class="score-input"
					size="is-small"
					type="number"
					min="0"
					max="20"
					v-model="vesenScore">
				</b-input>
				<div class="score-input-spacer-div" />
			</div>
			<div class="score-input-container">
				<div v-if="!onMobile" class="score-input-label">
					Overlevelse
				</div>
				<div v-if="onMobile" class="score-input-label">
					O
				</div>
				<b-input class="score-input"
					size="is-small"
					type="number"
					min="0"
					max="20"
					v-model="overlevelsesevneScore">
				</b-input>
				<div class="score-input-spacer-div" />
			</div>
			<div class="score-input-container">
				<div v-if="!onMobile" class="score-input-label">
					X-faktor
				</div>
				<div v-if="onMobile" class="score-input-label">
					X
				</div>
				<b-input class="score-input"
					size="is-small"
					type="number"
					min="0"
					max="20"
					v-model="xfactorScore">
				</b-input>
				<div class="score-input-spacer-div" />
			</div>
			<div class="score-input-container">
				<div v-if="!onMobile" class="score-input-label">
					I kulturen
				</div>
				<div v-if="onMobile" class="score-input-label">
					K
				</div>
				<b-input class="score-input"
					size="is-small"
					type="number"
					min="0"
					max="20"
					v-model="ikulturenScore">
				</b-input>
				<div class="score-input-spacer-div" />
			</div>
			<div class="score-input-container">
				<div class="score-input-label">
					MBV
				</div>
				<b-input class="score-input"
					size="is-small"
					type="number"
					min="0"
					max="20"
					v-model="mbvScore">
				</b-input>
				<div class="score-input-spacer-div" />
			</div>

			<b-button @click="onRegisterVbdVote" :disabled="voteButtonDisabled()" class="vote-button">
				Stem
			</b-button>
		</div>
		<div v-if="voteRegistered" class="voteregistered-div">
			{{ feedbackText }}
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'VbdVote',

	props: [
		'animal'
	],

	data() {
		return {
			onMobile: false,
			vesenScore: null,
			overlevelsesevneScore: null,
			xfactorScore: null,
			ikulturenScore: null,
			mbvScore: null,
			voteRegistered: false,
			feedbackText: 'Stemme registrert!'
		}
	},

	methods: {
		...mapActions([
			'registerVbdVote'
		]),

		...mapMutations([
			'updateVbdAnimals'
		]),

		scoreValid(score) {
			return score !== null && score >= 0 && score <= 20;
		},

		voteButtonDisabled() {
			return !(this.scoreValid(this.vesenScore) &&
				this.scoreValid(this.overlevelsesevneScore) &&
				this.scoreValid(this.xfactorScore) &&
				this.scoreValid(this.ikulturenScore) &&
				this.scoreValid(this.mbvScore))
		},

		onRegisterVbdVote() {
			this.registerVbdVote(
				{
					animalId: this.animal._id,
					vesenScore: this.vesenScore,
					overlevelsesevneScore: this.overlevelsesevneScore,
					xfactorScore: this.xfactorScore,
					ikulturenScore: this.ikulturenScore,
					mbvScore: this.mbvScore
				}
				).then((response) => {
					this.feedbackText = 'Stemme registrert!';
					this.voteRegistered = true;

					setTimeout(() => {
						const newVbdVote = response.data.newVbdVote;
						const vbdAnimalId = response.data.vbdAnimalId;
						this.updateVbdAnimals({ newVbdVote, vbdAnimalId });
					}, 3000);
				}).catch((error) => {
					this.feedbackText = 'Noe gikk galt... Ta kontakt med admin.';
					this.voteRegistered = true;
				}
			);
		},
	},

	created() {
		this.onMobile = window.innerWidth < 600;
	}
}
</script>

<style scoped>
	.vbdvote-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.01), 0 3px 10px 0 rgba(0, 0, 0, 0.05);
		margin: 5px;
		padding: 0 10px;
		width: 550px;
		height: 100px;
	}

	.inputs-container {
		display: flex;
		align-items: flex-end;
	}

	.score-input-container {
		margin: 10px 10px 10px 10px;
	}

	.score-input-label {
		font-size: 13px;
		text-align: center;
	}

	.score-input {
		width: 60px;
		margin: auto;
	}

	.animalname-div {
		margin: 5px 0 -10px 10px;
		font-size: 1.5em;
		color: #80D8C7
	}

	.vote-button {
		height: 28px;
		background-color: #80D8C7;
		color: #FFFFFF;
		margin: 10px 10px 10px auto;
	}

	.score-input-spacer-div {
		height: 0px;
	}

	.voteregistered-div {
		margin: 20px 0px;
		text-align: center;
	}

	@media only screen and (max-width: 600px) {
		.vbdvote-container {
			padding: 0 5px;
		}

		.score-input-label {
			font-size: 12px;
		}
	}
</style>