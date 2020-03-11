import {request} from "./request"

export function getDetail(iid) {
	return  request({
		url:'/detail',
		params:{
			iid
		}
	})
}
export function getRecommend() {
	return request({
		url:'/recommend',
		
	})
}
//ES5
// function Person(){
	
// }
// ES6
// class Person{
// 	constructor(name,age){
// 		this.name = name
// 		this.age = age
// 	}
// }
// const p = new Person('coxzero','18')
//将杂乱无章的数据通过创建对象的形式进行整理
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
		this.discountBgColor = itemInfo.discountBgColor;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : ''; 
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}


// //如何判断是否为空的对象
// const obj = {
	  
// }
// //获取 该对象的keys的长度，===0 则为空
// Object.keys(obj).length === 0 