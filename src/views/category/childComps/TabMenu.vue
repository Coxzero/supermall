<template>
	<div id="tab-menu">
		<scroll class="scroll">
			<div class="menu-list">
				<div class="menu-list-item" v-for="(item,index) in categories" 
				:class="{active: currentIndex === index}"
				 @click="itemClick(index)" :key="index">{{item.title}}</div>
			</div>
			
		</scroll>
</div>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'
	export default {
		name: 'TabMenu',
		components:{
			Scroll
		},
		props:{
			categories: Array
		},
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				this.$emit('selectItem', index)
			}
		}
	}
</script>

<style scoped>
	  #tab-menu {
			position: relative;
	    height: 100vh;
	    width: 100px;
	    box-sizing: border-box;
	  }
		.scroll{
			background-color: #f6f6f6;
			height: calc(100% - 44px - 49px);
			overflow: hidden;
			position: absolute;
			left: 0;
			right: 0;
		}
	  .menu-list-item {
	    height: 45px;
	    line-height: 45px;
	    text-align: center;
	    font-size: 14px;
	  }
	
	  .menu-list-item.active {
	    font-weight: 700;
	    color: var(--color-high-text);
	    background-color: #fff;
	    border-left: 3px solid var(--color-high-text);
	  }
</style>
