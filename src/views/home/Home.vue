<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends='recommends'></recommend-view>
		<feature-view></feature-view>
		<tab-control :title="['流行','新款','精选']" class="tab-contral"></tab-control >
		<ul>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar';
	import TabControl from 'components/content/tabControl/TabControl'
	
	import {getHomeMultidata} from "network/home";
	// import Swiper from 'components/common/swiper/Swiper'
	// import SwiperItem from 'components/common/swiper/SwiperItem'
	
	export default{
		name:'Home',
		components:{
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl
		},
		data(){
			return{
				banners:[],
				recommends: []
			}
		},
		created(){
			//请求多个数据
			getHomeMultidata().then(res => {
				//this值当前组件Home ，保存数据
				this.banners = res.data.banner.list;
			 this.recommends = res.data.recommend.list;
			})
		}
	}
</script>

<style>
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
	}
	.tab-contral{
		/*  */
		position: sticky;
		top: 44px;
	}
</style>
