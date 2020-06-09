<template>
	<div class="header-container">
		<router-link tag="div" :to="{ path: '/' }" class="header" >
			<h1 class="heading"> 
				VERDENS BESTE
			</h1>
			<h1 class="heading dyr">
				DYR
			</h1>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'CustomHeader'
}
</script>

<style scoped>
.header-container {
	display: flex;
	align-items: center;	
	flex-direction: column;
}

.header {
	width: fit-content;
	text-align: center;
	display: flex;
	cursor: pointer;
}

.heading {
	font-size: 2rem;
	margin: 10px 5px 0 5px;
	font-weight: 300;
	width: fit-content;
	color: #191f45;
}

.dyr {
	color: #80D8C7;
	font-weight: 500;
}
</style>