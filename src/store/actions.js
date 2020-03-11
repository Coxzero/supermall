export default{
	addCart(context, payload){
				 //数组的常用方法？ push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
				 //1.payload 添加商品
				 // let oldProduct = null ;
				 // for(let item of state.cartList){
					//  if(item.iid === payload.iid) {
					// 	 oldProduct = item;
					//  }
				 // }
				 
				 //1.查找之前数组是否有该商品
				 let oldProduct =context.state.cartList.find(item => item.iid === payload.iid)
				 //2.判断oldProduct
				 if(oldProduct){
					context.commit('addCounter',oldProduct)
					 }else{
						 payload.count = 1 
						 context.commit('addToCart',payload)
					}
				 
	}
}