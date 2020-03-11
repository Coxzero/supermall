import {debounce} from "./utils"
import BackTop  from 'components/content/backTop/BackTop'
//混入
export const itemListenerMixin = {
	data(){
		return{
			itemImgListener:null
		}
	},
	mounted(){
		//1.图片加载完成的事件监听
		const refresh = debounce(this.$refs.scroll.refresh,50)
		
		//2.对监听的事件进行保存
		this.itemImgListener = () => {
			refresh()
		}
		this.$bus.$on('itemImageLoad',this.itemImgListener)
	}
}

export const backTopMixin = {
	components:{
		BackTop
	},
	data() {
		return{
			isShowBackTop:false,
		}
	},
	methods:{
		backClick(){
						this.$refs.scroll.scrollTo(0,0)
		},
	}
}