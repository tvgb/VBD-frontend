<template>
	<div id="main-container">
		<router-view />
	</div>
</template>

<script>
import AppHeader from './components/layout/AppHeader';
import axios from 'axios';
import router from './router';

export default {
	name: 'App',
	components: {
		AppHeader
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
</style>