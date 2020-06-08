<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<span id="logo">
					RFGK
				</span>
			</b-navbar-item>
		</template>

		<template slot="end">	
		
		</template>
	</b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'AppHeader',

	computed: mapState({
		isAuthenticated: state => state.player.isAuthenticated
	}),

	methods: {
		...mapActions([
			'logout'
		]),

		startLogout() {
			this.logout();
		}
	}
}

</script>

<style scoped>
.navbar, .navbar-menu.is-active, .navbar-end, .navbar-item, .buttons, .button {
	background-color: transparent !important;
}

#logo {
	letter-spacing: 5px;
	font-size: 1.7em;
	font-weight: 500;
}

.buttons {
	display: flex;
	justify-content: flex-end;
}

</style>