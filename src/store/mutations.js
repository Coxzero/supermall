export default{
	//mutations唯一的目的就是修改state中的状态
	//mutations 中的每个方法尽可能的完成的事件比较单一一点
	addCounter(state, payload){
		payload.count++
	},
	addToCart(state, payload){
		state.cartList.push(payload)
	}
}