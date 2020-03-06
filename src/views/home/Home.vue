<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		
	<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
				<home-swiper :banners="banners"></home-swiper>
				<recommend-view :recommends='recommends'></recommend-view>
				<feature-view></feature-view>
				<tab-control :title="['流行','新款','精选']" class="tab-contral" @tabClick="tabClick"></tab-control >
				<goods-list :goods="showGoods"></goods-list>
</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar';
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop  from 'components/content/backTop/BackTop'
	
	import {getHomeMultidata,getHomeGoods} from "network/home";
	
	// import Swiper from 'components/common/swiper/Swiper'
	// import SwiperItem from 'components/common/swiper/SwiperItem'
	
	export default{
		name:'Home',
		components:{
			HomeSwiper, 
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data(){
			return{
				banners:[],
				recommends: [],
				goods:{
					// 流行数据
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				currentType:'pop',
				isShowBackTop:false
				}
		},
		computed:{
			 showGoods(){
				 return this.goods[this.currentType].list
			 }
		},
		created(){
			//请求多个数据
			this.getHomeMultidata()
			//2.请求商品数据  一旦 进入首页 第一个数据全部取出
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		methods:{
			/*
			事件监听
			*/
		 tabClick(index){
			 switch(index){
				 case 0:
					this.currentType = 'pop'
					break
					case 1: 
						this.currentType = 'new'
						break
						case 2:
						this.currentType = 'sell'
						break
			 }
		 },
		 backClick(){
				this.$refs.scroll.scrollTo(0,0)
		 },
		 contentScroll(position){
			this.isShowBackTop = (-position.y) > 1000
		 },
			/*
			网络请求相关方法
			*/
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					//this值当前组件Home ，保存数据
					this.banners = res.data.banner.list;
				 this.recommends = res.data.recommend.list;
				 
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1 //多一组数据 页码加一 
				})
			}
		
		}
	}
</script>

<style scoped>
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	#home{
		 padding-top: 44px; 
		height: 100vh;
	}
	.tab-contral{
		/*  */
		position: sticky;
		top: 44px;
		z-index: 9;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
/* 	.content{
		height: calc(100% - 93px);
		
		margin-top: 44px;
	} */
</style>
