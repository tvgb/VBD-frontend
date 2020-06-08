<template>
	<div class="changepassword-container">
		<h1 class="changepassword-header">
			Endre passord
		</h1>

		<b-field class="input-field" label="Nytt passord">
			<b-input 
				type="password"
				required
				minlength="8"
				maxlength="50"
				v-model="newPassword"
				ref="newPasswordField">
			</b-input>
		</b-field>

		<b-field class="input-field newPasswordAgain" label="Gjenta passord">
			<b-input 
				type="password"
				required
				minlength="8"
				maxlength="50"
				:validation-message="newPassword !== newPasswordAgain ? 'Passordene stemmer ikke overens.' : ''"
				v-model="newPasswordAgain"
				ref="newPasswordAgainField">
			</b-input>
		</b-field>

		<b-field 				
			:type="changeFailed ? 'is-danger': ''"
			class="input-field" label="Gammelt passord">
			<b-input
				type="password"
				required
				v-model="oldPassword"
				ref="oldPasswordField">
			</b-input>
		</b-field>

		<b-button 
			@click="onChangePassword" 
			:disabled="
				newPassword === null || 
					newPasswordAgain === null || 
					oldPassword === null ||
					newPassword !== newPasswordAgain ||
					!this.$refs.newPasswordField.isValid ||
					!this.$refs.newPasswordAgainField.isValid ||
					!this.$refs.oldPasswordField.isValid" 
			class="save-button" type="is-light">
			Lagre
		</b-button>

		<div v-if="changeFailed">
			Feil passord.
		</div>

		<div class="success-box" v-if="changeSuccessful">
			Passordet har blitt oppdatert!
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'ChangePasswordPage',

	data() {
		return {
			newPassword: null,
			newPasswordAgain: null,
			oldPassword: null,
			changeSuccessful: false,
			changeFailed: false
		}
	},

	methods: {
		...mapActions([
			'changePassword'
		]),

		onChangePassword() {

			this.changePassword(
				{
					newPassword: this.newPassword,
					oldPassword: this.oldPassword
				}
			).then(() => {
				this.changeFailed = false;
				this.changeSuccessful = true;
			}).catch((error) => {
				if (error.response.status === 400) {
					this.changeFailed = true;
				}
			});
		}
	}
}
</script>

<style scoped>

	.changepassword-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.changepassword-header {
		text-align: center;
		font-size: 1.5em;
		margin-bottom: 20px;
	}

	.input-field {
		width: 400px;
	}

	.newPasswordAgain {
		margin-bottom: 50px;
	}

	.save-button:disabled, .save-button:disabled:hover {
		background-color: #DDDDDD;
	}

	.save-button {
		margin: 10px;
		width: 400px;
		background-color: #80D8C7;
		border-radius: 5px;
		color: white;
		font-weight: 600;
	}

	.save-button:hover {
		background-color: #59ccb6;
		color: white;
	}

	.success-box {
		color: darkgreen;
	}

	@media only screen and (max-width: 600px) {
		.changepassword-container {
			width: 100%;
			padding: 50px 20px 20px 20px;
		}

		.input-field, .save-button {
			width: 100%;
		}
	}
</style>