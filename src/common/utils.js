export function  //防抖函数 delay:等多久。 ...args:可以传多个参数
		 debounce(func,delay){
			 let timer = null
			 return function (...args) {
				 if(timer) clearTimeout(timer)
				 timer = setTimeout(() => {
					 func.apply(this,args) //this 指向 func（this.$refs.scroll.refresh）
				 },delay)
			 }
		 }
		 