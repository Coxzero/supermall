import {request} from "./request";

export function getHomeMultidata(){//多个主页的数据
	return request({
		url:'/home/multidata'
	})
}

export function getHomeGoods(type,page){
	return request({
		url:'/home/data',
		params:{
			type,
			page
		}
	})
	
}

// let totalNums = []
// const nums1 = [20,11,11]
// const nums2 = [111,22,333]

// // for(let n of list){
// // 	totalNums.push(n)
// // }
// totalNums.push(...nums1)