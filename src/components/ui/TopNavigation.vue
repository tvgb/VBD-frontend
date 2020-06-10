<template>
	<div class="navigation-button-container">
		<button 
			@mouseover="vbdHovered = true"
			@mouseleave="vbdHovered = false"
			v-bind:class="[ vbdSelected && !folketHovered ? 'selected' : 'not-selected']"
			type="is-light" 
			class="navigation-button left"
			@click="vbdClicked">
			VBD
		</button>
		<button 
			@mouseover="folketHovered = true"
			@mouseleave="folketHovered = false"
			v-bind:class="[ vbdSelected || vbdHovered ? 'not-selected' : 'selected']"
			type="is-light"
			class="navigation-button right"
			@click="folketClicked">
			Folket
		</button>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'TopNavigation',

	props:[
		'initialSelection'
	],

	data() {
		return {
			vbdSelected: this.initialSelection === 'VBD',
			vbdHovered: false,
			folketHovered: false
		}
	},

	methods: {
		...mapMutations([
			'setAnimalType'
		]),

		vbdClicked() {
			if (!this.vbdSelected)  {
				this.setAnimalType('VBD');
				this.vbdSelected = true;
			}
		},

		folketClicked() {
			if (this.vbdSelected)  {
				this.setAnimalType('FOLKET');
				this.vbdSelected = false;
			}
		}
	}
}
</script>

<style scoped>
	.navigation-button {
		width: 100px;
		border: 0;
		height: 36px;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 1px;
		outline: none;
		box-shadow: none;
	}

	.left {
		border-radius: 50px 0 0 50px;
	}
	
	.right {
		border-radius: 0 50px 50px 0;
	}

	.selected, .selected:hover {
		background-color: #80D8C7;
		color: white;
		cursor: default;
	}

	.not-selected {
		border: solid 1px #80D8C7;
		color: #80D8C7;
		background-color: #F9F9F9;
		cursor: pointer;
		font-weight: 400;
	}

	.not-selected:hover {
		background-color: #80D8C7;
		color: white;
	}

	@media only screen and (max-width: 600px) {
		.navigation-button {
			width: 80px;
			border: 0;
			height: 30px;
			font-size: 12px;
			font-weight: 400;
			letter-spacing: 1px;
			outline: none;
			box-shadow: none;
		}

		.not-selected {
			border: solid 1px #80D8C7;
			color: #80D8C7;
			background-color: #F9F9F9;
			cursor: pointer;
			font-weight: 400;
		}
	}

</style>