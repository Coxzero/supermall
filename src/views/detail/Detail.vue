<template>
	<div id="detail">
	<detail-nav-bar></detail-nav-bar>
	<detail-swiper :top-images="topImages"></detail-swiper>
	</div>
</template>

<script>
	import DetailNavBar from './Childcomps/DetailNavBar'
	import DetailSwiper from './Childcomps/DetailSwiper'
	
	import {getDetail} from "network/detail"
	export default{
		name:`Detail`,
		components:{
			DetailNavBar,
			DetailSwiper
		},
		data(){
			return{
				iid:null,
				topImages: []
			}
		},
		created(){
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res =>{
				//获取轮播图的轮播数据
				this.topImages = res.result.itemInfo.topImages
			})
		}
	}
</script>

<style scoped>
</style>
