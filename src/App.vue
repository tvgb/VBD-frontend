<template>
	<div id="main-container">
		<CustomHeader />
		<router-view />
	</div>
</template>

<script>
import CustomHeader from './components/layout/CustomHeader';
import axios from 'axios';
import router from './router';

export default {
	name: 'App',
	components: {
		CustomHeader
	}
}
</script>

<style>
	#main-container {
		min-height: 100vh;
		width: auto;
		font-family: 'Poppins', sans-serif;
		background-color: #F9F9F9;
	}

	.header {
		text-align: center;
		font-size: 1.5em;
		margin-bottom: 20px;
	}

	@media only screen and (max-width: 600px) {
		.header {
			text-align: center;
			font-size: 1.2em;
			margin-bottom: 20px;
		}
	}
</style>