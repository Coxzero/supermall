<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button class="check-button" :is-active="isSelectAll" @click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="price">
			合计：{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去结算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import {mapGetters} from 'vuex'
	export default{
		name:"CartBottomBar",
		components:{
			CheckButton
		},
		computed:{
			...mapGetters(['cartList']),
			totalPrice(){
				return '¥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue,item) => {
					return preValue + item.price * item.count
				},0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				if(this.cartList.length === 0) return false
				//1.使用filter函数
			// return	!(this.cartList.filter(item => !item.checked).length)
			//2.使用find函数
			return !this.cartList.find(item => !item.checked)
			//3.普通遍历
			// for(let item of this.cartList){
			// 	if(!item.checked){
			// 		return false
			// 	}
			// }
			// return true
			}
		},
		methods:{
			checkClick(){
				if(this.isSelectAll){//全部选中
					this.cartList.forEach(item => item.checked = false)
				}else{//部分选中或者 全部不选中
					this.cartList.forEach(item => item.checked = true)
				}
				// this.cartList.forEach(item => item.checked = !this.isSelectAll)
			},
			calcClick(){
				if(!this.isSelectAll) {
					this.$toast.show('请选择购买的商品',2000)
				} else{
					this.$toast.show('结算成功',2000)
				}
				if(this.cartList.length === 0) {
					this.$toast.show('请勾选您想要的商品',2000)
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar{
		height: 40px;
		background-color: #eee;
		position: relative;
	line-height: 40px;
	display: flex;
	}
	.check-button{
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
		
	}
	.check-content {
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}
	.price{
	text-align: center;
		flex: 1;
	}
	.calculate{
		width: 80px;
		text-align: center;
		background-color: red;
		color: #fff;

	}
</style>
