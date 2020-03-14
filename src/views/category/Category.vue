<template>
	
	<div id="category">
	<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
	<div class="content" >
		<tab-menu :categories="categories" @selectItem="selectItem" ></tab-menu>

		<scroll id="tab-content"  :probe-type="3" :pull-up-load="true" >
			<div>
				<tab-content-category :subcategories="showSubcategory" ></tab-content-category>
				<tab-control :title="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl2" ></tab-control >
				 <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
			</div>
		</scroll>
	</div>
	</div>
</template>

<script>
	
	import Scroll from 'components/common/scroll/Scroll'
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import TabContentDetail from './childComps/TabContentDetail'
	import TabMenu from './childComps/TabMenu'
	import TabContentCategory from './childComps/TabContentCategory'
	
	import {getCategory, getSubcategory,getCategoryDetail} from 'network/catejory'
	 import {POP, SELL, NEW} from "common/const";
	import {tabControlMixin} from 'common/mixin'
	export default{
		name:'Category',
		mixins:[tabControlMixin],
		components:{
			NavBar,
			TabMenu,
			Scroll,
			TabContentCategory,
			TabControl,
			TabContentDetail
		},
		data(){
			return{
				categories: [],//list数据
				categoryData: {},
				 currentIndex: -1,
			}
		},
		created(){
			//请求数据
			this.getCategory()
		},
		computed:{
			showSubcategory(){
			if (this.currentIndex === -1) return {}
			return this.categoryData[this.currentIndex].subcategories
			},
			showCategoryDetail() {
				 if (this.currentIndex === -1) return []
				return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
			 }
		},
		methods:{
			//1.网络请求
			getCategory(){
				getCategory().then(res => {
					this.categories = res.data.category.list
					console.log(res)
					 // 2.初始化每个类别的子数据
					for (let i = 0; i < this.categories.length; i++) {
					            this.categoryData[i] = {
					              subcategories: {},
					              categoryDetail: {
					          'pop': [],
					          'new': [],
					         'sell': []
					       }
					    }
					 }
					// 3.请求第一个分类的数据
				this.getSubcategories(0)
				})
			},
			   getSubcategories(index) {
			        this.currentIndex = index;
					    const mailKey = this.categories[index].maitKey;
			        getSubcategory(mailKey).then(res => {
			          this.categoryData[index].subcategories = res.data
			          this.categoryData = {...this.categoryData}
			          this.getCategoryDetail(POP)
			          this.getCategoryDetail(SELL)
			          this.getCategoryDetail(NEW)
			        })
			      },
			      getCategoryDetail(type) {
					    // 1.获取请求的miniWallkey
			        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
			        // 2.发送请求,传入miniWallkey和type
					    getCategoryDetail(miniWallkey, type).then(res => {
					      // 3.将获取的数据保存下来
					      this.categoryData[this.currentIndex].categoryDetail[type] = res
			          this.categoryData = {...this.categoryData}
			        })
			      },
			//事件方法
			selectItem(index){
				 this.getSubcategories(index)
			},

		}

	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
overflow: hidden;
    display: flex;
  }
	  #tab-content {
	    height: 100%;
	    flex: 1;
	  }
</style>
