<template>
	<!-- 所有的item -->
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive"><slot  name="item-icon"></slot></div>
		<div v-else><slot  name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
		
		</div>

</template>

<script>
	export default{
		name:'TabBarItem',
		props:{
			path:String,
			activeColor:{
				type:String,
				
			}
		},
		data(){
			return{
				
			}
		},
		computed:{
			isActive(){
				//判断当前活跃路径（/home）
				 //
				return this.$route.path.indexOf(this.path) !== -1
				//this.$route.path.includes(this.path) == 1
				
			},
			 activeStyle(){
				return this.isActive ? {color:this.activeColor} : {}
			}
		},
		methods:{
			itemClick(){
				if(this.path !== this.$route.path) this.$router.replace(this.path)
			
			}
		}
	}
</script>

<style>

	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	
</style>
