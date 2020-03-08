<template>
	<!-- ref 一般在子组件使用 -->
	<div class="wrapper" ref="wrapper">
		<div class=" content">
			<slot></slot>
		</div>
		
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name:"Scroll",
		data(){
			return{
				scroll:null
			}
		},
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			//1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
		//2.监听滚动的位置
		if( this.probeType === 2 || this.probeType === 3){
			this.scroll.on('scroll',(position) => {
				this.$emit('scroll',position)
			})
		}
		//3.监听上拉事件
		if(this.pullUpLoad){
			this.scroll.on('pullingUp', () => {
				this.$emit('pullingUp')
			})
		}
	
		},
		methods:{
			scrollTo(x,y,time = 500){
				//&& 逻辑语 如果this.scroll 为null（false） 则后面不会执行
			this.scroll &&	this.scroll.scrollTo(x,y,time)
			},
			finishPullUp(){
				this.scroll &&	this.scroll.finishPullUp()
			},
			refresh() {//从新计算可滚动区域
				this.scroll &&	this.scroll.refresh();
			},
			getScrollY(){
				return this.scroll? this.scroll.y:0
			}
		}
	}
</script>

<style scoped>
</style>
