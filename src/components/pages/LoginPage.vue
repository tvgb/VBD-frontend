<template>
	<div class="container">
		<h1 class="header">
			Admin logg inn for VBD
		</h1>

		<b-field class="input-field" label="Epost">
			<b-input v-model="email" type="email"></b-input>
		</b-field>

		<b-field class="input-field" label="Passord">
			<b-input v-model="password" type="password"></b-input>
		</b-field>

		<b-button v-on:keyup.enter="startLogin()" @click="startLogin()" class="login-button"  type="is-light">
			Logg inn
		</b-button>

		<div v-if="!loginSuccessful">
			Feil epost eller passord.
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'LoginPage',
	
	data() {
		return {
			email: '',
			password: '',
			loginSuccessful: true
		}
	},
	
	methods: {
		...mapActions([
			'login'
		]),

		startLogin() {
			this.login({
				email: this.email,
				password: this.password
			}).then(() => {
				this.email = '';
				this.password = '';
				this.loginSuccessful = true;
			}).catch(() => {
				this.loginSuccessful = false;
			});
		}
	}
}
</script>

<style scoped>
	.container {
		padding: 200px 20px 20px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}

	.input-field {
		height: auto;
		width: 100%;
	}

	.login-button {
		margin: 10px;
		width: 100%;
		background-color: #478E66;
		border-radius: 5px;
		color: white;
	}

	.button:hover {
		background-color: #446E5C;
		color: white;
	}

	@media only screen and (max-width: 600px) {
		.container {
			width: 100%;
		}
	}

</style>