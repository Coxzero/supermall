import {request} from "./request";

export function getHomeMultidata(){//多个主页的数据
	return request({
		url:'/home/multidata'
	})
}