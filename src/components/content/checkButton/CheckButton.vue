<template>
	<div class="check-button" :class="{checked:isActive}" >
		<img src="~assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default{
		name:'CheckButton',
		props:{
			isActive:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style scoped>
	.check-button{
		
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.checked{
		background-color: red;
		border-color: red;
	}
</style>
