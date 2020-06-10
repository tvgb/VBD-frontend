<template>
	<div class="folketvote-container">
		<div v-if="animalType === 'FOLKET' && !voteRegistered(animal._id)" class="vote-container">
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
				<div  v-if="!onMobile" class="score-input-label">
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
			<b-button :disabled="voteButtonDisabled()" @click="onRegisterFolketVote" class="vote-button">
				Stem
			</b-button>
		</div>
		<div v-if="voteRegistered(animal._id) && animalType==='FOLKET'" class="vote-registered-div">
			Din stemme har blitt registrert.
		</div>
	</div>
	
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import * as Fingerprint2 from 'fingerprintjs2'
import * as UAParser from 'ua-parser-js'

export default {
	name: 'FolketVote',

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
			mbvScore: null
		}
	},

	methods: {
		...mapActions([
			'registerFolketVote'
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

		onRegisterFolketVote() {

			for (const animalId of this.registeredVotes) {
				if (animalId === this.animal._id) {
					return;
				}
			}

			this.getFingerprint().then((hash) => {

				this.registerFolketVote(
				{
					bfp: hash,
					animalId: this.animal._id,
					vesenScore: this.vesenScore,
					overlevelsesevneScore: this.overlevelsesevneScore,
					xfactorScore: this.xfactorScore,
					ikulturenScore: this.ikulturenScore,
					mbvScore: this.mbvScore
				}	
				);

			}).catch((error) => {
				return;
			});
		},

		getFingerprint () {
			return new Promise((resolve, reject) => {
				async function getHash () {
					const options = {
						excludes: {
						plugins: true,
						localStorage: true,
						adBlock: true,
						screenResolution: true,
						availableScreenResolution: true,
						enumerateDevices: true,
						pixelRatio: true,
						doNotTrack: true
						},
						preprocessor: (key, value) => {
							if (key === 'userAgent') {
								const parser = new UAParser(value)
								// return customized user agent (without browser version)
								return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${parser.getEngine().name}`
							}
							return value
						}
					}

					try {
						const components = await Fingerprint2.getPromise(options);
						const values = components.map(component => component.value);

						return String(Fingerprint2.x64hash128(values.join(''), 31));
					} catch (e) {
						reject(e);
					}
				}

				if (window.requestIdleCallback) {
					requestIdleCallback(async () => resolve(( this.bfp = await getHash())));
				} else {
					setTimeout(async () => resolve(this.bfp = await getHash()), 500);
				}
			});
		}
	},

	computed: {
		...mapState({
			animalType: state => state.animal.animalType,
			registeredVotes: state => state.animal.registeredVotes
		}),

		...mapGetters([
			'voteRegistered'
		])
	},

	created() {
		this.onMobile = window.innerWidth < 600;
	}

}
</script>

<style scoped>
	.folketvote-container {
		width: 100%;
	}

	.vote-container {
		width: 100%;
		height: 62px;
		display: flex;
		align-items: flex-end;
	}

	.score-input-container {
		display: flex;
		flex-direction: column;
		margin: 10px 0px 10px 20px;
	}

	.score-input-label {
		font-size: 13px;
		text-align: center;
	}

	.score-input {
		width: 60px;
		margin: auto;
	}

	.vote-button {
		margin: 10px 20px 10px auto;
		height: 28px;
		background-color: #80D8C7;
		color: white;
	}

	.vote-button:disabled, .vote-button:disabled:hover {
		background-color: #DDDDDD;
		color: white;
	}

	.vote-registered-div {
		text-align: center;
		margin: 5px;
	}

	@media only screen and (max-width: 600px) {

		.vote-container {
			padding: 0 5px;
		}

		.score-input-container {
			display: flex;
			flex-direction: column;
			margin: 0 7px 10px 7px;
		}

		.score-input-label {
			font-size: 12px;
		}

		.score-input {
			width: 100%;
			margin: auto;
		}

		.vote-button {
			margin: 10px 7px 10px auto;
			padding: auto;
			height: 28px;
			background-color: #80D8C7;
			color: white;
		}

		.vote-registered-div {
			font-size: 0.8em;
			text-align: center;
			margin: 5px;
		}
	}
</style>