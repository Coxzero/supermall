<template>
	<div id="detail">
	<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
			<detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods="recommends" ref="recommend"></goods-list>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		<!-- <toast :message="message" :show="show"></toast> -->
	</div>
</template>

<script>
	import DetailNavBar from './Childcomps/DetailNavBar'
	import DetailSwiper from './Childcomps/DetailSwiper'
	import DetailBaseInfo from './Childcomps/DetailBaseInfo'
	import DetailShopInfo from './Childcomps/DetailShopInfo'
	import DetailGoodsInfo from './Childcomps/DetailGoodsInfo'
	import DetailParamInfo from './Childcomps/DetailParamInfo'
	import DetailCommentInfo from './Childcomps/DetailCommentInfo' 
	import DetailBottomBar from './Childcomps/DetailBottomBar'
		
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	// import Toast from 'components/common/toast/Toast'
	
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
	import {debounce} from "common/utils"
	import {itemListenerMixin,backTopMixin} from 'common/mixin'
	
	export default{
		name:`Detail`,
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList,
		},
		mixins:[itemListenerMixin,backTopMixin],
		data(){
			return{
				iid:null,
				topImages: [],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopY:[],
				getThemeTopY:null,
				currentIndex:0,
			}
		},
		created(){
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//this.iid = this.$route.query.iid
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res =>{
				
				const data = res.result
				//1.获取轮播图的轮播数据
				this.topImages = data.itemInfo.topImages
				//2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//3.创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)
				//4.保存商品详情数据
				this.detailInfo = data.detailInfo;
				//5.获取参数信息
				this.paramInfo = new  GoodsParam(data.itemParams.info, data.itemParams.rule)
				//6.取出评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				
				// this.$nextTick(() => {
				// 	//updata 更新两次 需要赋空
				// 	//根据最新的数据，对应的Dom是已经被渲染出来
				// 	//但是图片依然没有加载完（目前获取到的offsetTop 不包含图片）
				// 	//值依然不对
					// this.themeTopY = []
					// this.themeTopY.push(0)
					// this.themeTopY.push(this.$refs.params.$el.offsetTop)
					// this.themeTopY.push(this.$refs.comment.$el.offsetTop)
					// this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
					// console.log(this.themeTopY)
				// })
			})
			//3.请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			//4.给getThemeTopY赋值 (给this.themeTopY赋值的操作防抖)
			this.getThemeTopY = debounce(() => {
				this.themeTopY = []
				this.themeTopY.push(0)
				this.themeTopY.push(this.$refs.params.$el.offsetTop)
				this.themeTopY.push(this.$refs.comment.$el.offsetTop)
				this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
				this.themeTopY.push(Number.MAX_VALUE)
			},100)
		},
		mounted(){
			//改为混入mixin
		
		},
		destroyed(){
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		methods:{
			//4.监听详情的图片加载完成
			imageLoad(){
				this.$refs.scroll.refresh()
				this.getThemeTopY()
			},
			titleClick(index){
				console.log(index)
				this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
			},
			contentScroll(position){
			//1.获取y值
				const positionY = -position.y
			//2.positionY 和主题中的值对比
				//[ 0, 2904, 4324, 4519 ]
				// for(let i of this.themeTopY) {
				// 	console.log(i);// str 3+1 = 31
				// 	// if(positionY > this.themeTopY[i] && positionY < this.themeTopY[i+1]){
				// 	// 	console.log(i)
				// 	// }
				// }
				let length = this.themeTopY.length
				for(let i = 0; i < length - 1; i++){
					// if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < 
					// this.themeTopY[i+1]) || (i == length - 1 && positionY >= this.themeTopY[i])) ){
						// this.currentIndex = i;
						// this.$refs.nav.currentIndex = this.currentIndex
					// }
					if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
			//3.是否返回顶部
				this.isShowBackTop = (-position.y) > 1000
			},
			addToCart(){
				//1.获取购物车需要展示的想信息、
				
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.nowPrice;
				product.iid = this.iid;
				
				//2.商品添加到购物车里
				this.$store.dispatch('addCart',product).then(res => {
					// this.show = true
					// this.message = res;
					// setTimeout(() => {
					// 	this.show = false
					// 	this.message = ''
					// },1500)
					this.$toast.show(res,2000)
				})
				//3.添加成功
			}
		}
	}
</script>

<style scoped>
	#detail{
		position: relative;
		z-index: 1;
		background-color: #fff;
		/* 100%视图高度 */
		height: 100vh;
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.content{
		background-color: #fff;
		height: calc(100% - 44px - 49px);
		overflow: hidden;
		position: absolute;
		top: 44px;
		left: 0;
		right: 0;
	}
</style>
