<template>
	<div class="wrapper">
		<ul class="content">
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
			<li>哈哈</li>
		</ul>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'Category',
		data(){
			return{
				scroll:null
			}
		},
		mounted(){
			this.scroll = new BScroll(document.querySelector('.wrapper'),{
				probeType:3,
				pullUpLoad:true
			})
			this.scroll.on('scroll', (position) => {
			//	console.log(position)
			})
			this.scroll.on('pullingUp',() => {
				console.log('加载中... ...')
				this.scroll.finishPullUp()
			})
		}
	}
</script>

<style scoped>
	.wrapper{
		height: 150px;
		background-color: red;
		 overflow: hidden;
		/*overflow-y: scroll; */
	}
</style>
