<template>
	<div class="tab-control">
		<div v-for="(item,index) in title" class="tab-control-item" :key="index" 
		:class="{active:index ===currentIndex}" @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'TabControl',
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				this.$emit('tabClick',index)
			}
		},
		props:{
			title:{
				type:Array,
				default(){
					return[]
				}
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
		
	}
	.tab-control-item{
		flex:1;
	
	}
	.active{
		color: var(--color-high-text);
		
	}
	.active span {
		border-bottom: 3px solid var(--color-tint);
		padding: 5px;
	}
</style>
