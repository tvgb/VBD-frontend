<template>
	<div class="admin-page-container">
		<h1 class="adminpage-header">
			Admin
		</h1>

		<b-button class="admin-page-button" type="is-light" tag="router-link" :to="{ path: '/nyttdyr' }">
			Legg til nytt dyr
		</b-button>
		<b-button class="admin-page-button" type="is-light" tag="router-link" :to="{ path: '/stem' }">
			Stem på dyr
		</b-button>
		<b-button class="admin-page-button" type="is-light" tag="router-link" :to="{ path: '/endrepassord' }">
			Endre passord
		</b-button>
	</div>
</template>

<script>

import os from 'os';

export default {
	name: 'AdminPage.vue'
}
</script>

<style scoped>
	.admin-page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.adminpage-header {
		text-align: center;
		font-size: 1.5em;
		margin-bottom: 20px;
	}

	.admin-page-button {
		background-color: #80D8C7;
		color: white;
		width: 200px;
		margin-bottom: 10px;
	}

	.admin-page-button:hover {
		background-color: #59ccb6;
		color: white;
	}
	
</style>