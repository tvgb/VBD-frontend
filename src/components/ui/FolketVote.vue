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
				<div class="score-input-label">
					F/A
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
					this.voteRegistered = true;
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
					
				).then(() => {
					this.voteRegistered = true;
				}).catch((error) => {
					if (error.response.status === 406) {
						this.voteRegistered = true;
					}
				});

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

<style>
	.folketvote-container {
		width: 100%;
	}

	.vote-container {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.score-input-container {
		display: flex;
		flex-direction: column;
		margin: 0 10px;
	}

	.score-input-label {
		font-size: 15px;
		text-align: center;
	}

	.score-input-spacer-div {
		height: 22px;
	}

	.vote-button {
		margin: 10px;
		margin-left: auto;
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
		margin-bottom: 5px;
	}

	@media only screen and (max-width: 600px) {

		.vote-container {
			padding: 0 5px;
		}

		.score-input-container {
			display: flex;
			flex-direction: column;
			margin: 0 10px;
		}

		.score-input-label {
			font-size: 12px;
		}

		.score-input-spacer-div {
			height: 18px;
		}
	}
</style>