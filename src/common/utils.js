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
		 //正则表达式
	export function formatDate(date, fmt) {
		//1获取年份
		//y 
		//y+ -> 表示一个或多个y
		//y* -> 表示0个或者多个y
		//y? -> 表示0个或者1个y
		//2019
		//yy - 19
		//yyyy - 2019
		//y - 9
	  if (/(y+)/.test(fmt)) {
	    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	  }
		//2.获取
		//
	  let o = {
	    'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds()
	  };
	  for (let k in o) {
	    if (new RegExp(`(${k})`).test(fmt)) {
	      let str = o[k] + '';
	      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
	    }
	  }
	  return fmt;
	};
	
	function padLeftZero (str) {
	  return ('00' + str).substr(str.length);
	};
		 
