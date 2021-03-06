<template>
	<div class="outer-container">
		<!-- <b-button tag="router-link" :to="{ path: '/' }" class="home-button">
			<font-awesome-icon icon="arrow-circle-left"/>
			Hjem
		</b-button> -->
		<div class="submit-animals-container">
			<h1 class="header">
				Legg til et nytt dyr
			</h1>
	
			<b-field label="Dyrets representant">
				<b-select expanded v-model="selectedUser">
					<option v-for="user in users" :key="user._id" v-bind:value="user._id">
						{{ user.firstName }} {{ user.lastName }}
					</option>
				</b-select>
			</b-field>

			<b-field class="input-field" label="Navn">
				<b-input required v-model="name"></b-input>
			</b-field>

			<input style="display: none" accept="image/jpeg" ref="fileInput" type="file" @change="onFileSelected">

			<div class="image-button-container">
				<div class="info-box">
					Bildet som blir lastet opp må være .jpg. Bildet vil bli skalert ned til 100x100 piksler
					etter opplasting. Det vil si at jo nærmere 100x100 piksler bildet ditt originalt er, jo bedre
					blir det seende ut på nettsiden.
				</div>
				<b-button class="upload-image-button" @click="$refs.fileInput.click()">
					Velg bilde 
					<font-awesome-icon icon="file-upload"/>
				</b-button>
			</div>


			<b-button :disabled="saveButtonDisabled()" class="save-button" @click="onUpload">
				Lagre
			</b-button>

			<div class="success-box" v-if="uploadSuccesful">
				Dyret har blitt lagret! 
				<b-button tag="router-link" :to="{ path: '/' }">
					Gå tilbake til hovedsiden
				</b-button>
			</div>

			<div class="failure-box" v-if="!uploadSuccesful && uploadAttemped">
				Noe gikk galt... Ta kontakt med admin!
			</div>

		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'SubmitAnimalPage',

	data() {
		return {
			selectedUser: null,
			name: null,
			selectedFile: null,
			uploadSuccesful: false,
			uploadAttemped: false
		}
	},

	methods: {
		...mapActions([
			'submitAnimal',
			'getUsers',
			'getUserId'
		]),

		saveButtonDisabled() {
			return this.name === null ||
			this.name === '' ||
			this.selectedFile === null ||
			this.selectedUser === null
		},

		onFileSelected(event) {
			this.uploadAttemped = false;
			this.uploadSuccesful = false;
			this.selectedFile = event.target.files[0];
		},

		onUpload() {

			this.submitAnimal(
				{
					userId: this.selectedUser,
					name: this.name, 
					image: this.selectedFile
				}).then(() => {
					this.uploadSuccesful = true;
					this.uploadAttemped = false;
				}).catch(() => {
					this.uploadAttemped = true;
					this.uploadSuccesful = false;
				});
		}
	},

	computed: {
		...mapState({
			users: state => state.user.users,
			userId: state => state.user.userId
		})
	},

	created() {
		this.getUsers();
		this.getUserId().then((userId) => {
			this.selectedUser = userId
		});
	}

}
</script>

<style scoped>
	.outer-container {
		display: flex;
		flex-direction: column;	
		align-items: center;
	}

	.submit-animals-container {
		width: 450px;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.image-button-container, .upload-image-button {
		width: 100%;
	}

	.save-button {
		margin-top: 20px;
		width: 100%;
		background-color: #80D8C7;
		border-radius: 5px;
		color: white;
	}

	.save-button:hover {
		background-color: #59ccb6;
		color: white;
	}

	.info-box {
		font-size: 0.8em;
	}

	.success-box {
		margin-top: 20px;
		display: flex;
		align-items: baseline;
		justify-content: space-evenly;
		color: #446E5C;
	}

	.failure-box {
		margin-top: 20px;
		display: flex;
		align-items: baseline;
		justify-content: space-evenly;
		color: red;
	}

	.home-button {
		margin: 10px;
		align-self: flex-start;
	}

	@media only screen and (max-width: 600px) {
		.submit-animals-container {
			width: 100%;
		}

		.success-box {
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
		}
	}
</style>