<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<tab-control :title="['流行','新款','精选']"  @tabClick="tabClick" 
		ref="tabControl1" class="tab-control"
		 v-show="isTabfixed"></tab-control >
	<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
	 @pullingUp="loadMore" > 
				<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
				<recommend-view :recommends='recommends'></recommend-view>
				<feature-view></feature-view>
				<tab-control :title="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl2" ></tab-control >
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
	import {debounce} from "common/utils"
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
				isShowBackTop:false,
				tabOffsetTop:0,
				isTabfixed:false,
				saveY:0
				}
		},
		computed:{
			 showGoods(){
				 return this.goods[this.currentType].list
			 }
		},
		activated(){
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated(){
			this.saveY = this.$refs.scroll.getScrollY()
		},
		created(){
			//请求多个数据
			this.getHomeMultidata()
			//2.请求商品数据  一旦 进入首页 第一个数据全部取出
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
			//3.监听item中的图片加载完成
			
		
		},
		mounted(){
			//1.图片加载完成的事件监听
			const refresh = debounce(this.$refs.scroll.refresh,50)
			
			this.$bus.$on('itemImageLoad',() => {
			refresh()
				})
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
			 this.$refs.tabControl1.currentIndex = index;
			 this.$refs.tabControl2.currentIndex = index;
		 },
		 backClick(){
				this.$refs.scroll.scrollTo(0,0)
		 },
		 contentScroll(position){
			 //1.判断BackTop是否显示
			this.isShowBackTop = (-position.y) > 1000
			
			//2.决定tabcontrol 是否吸顶（position：fixed）
			this.isTabfixed = (-position.y) > this.tabOffsetTop
		 },
		 loadMore(){
			 this.getHomeGoods(this.currentType)
		 },
		 swiperImageLoad(){
			 //2.获取 tabControl的offsetTop
			 //所有的组件都有一个$el：用于获取组件的元素 属性
			 this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			 
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
					
					this.$refs.scroll.finishPullUp()//加载更多
				})
			}
		
		}
	}
</script>

<style scoped>
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		/* 在使用浏览器原生滚动时，为了让浏览器不跟随一起滚动 */
		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	#home{
		height: 100vh;
	}
/* 	.tab-contral{
		
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.tab-control{
		position: relative;
		z-index: 9;
	}
/* 	.content{
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>
