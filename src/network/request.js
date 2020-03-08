import axios from 'axios'

export function request(config){

	//1.创建axios 实例
	const instance = axios.create({
		baseURL:'http://123.207.32.32:8000/api/wh',
		timeout:10000,
	
	})
	//2.axios的拦截器
	//请求拦截
	instance.interceptors.request.use(config => {
		return config

	}, err => {
	
	})
	//2.2响应拦截
	instance.interceptors.response.use(res => {
		return res.data
		//res.data
	}, err => {
		console.log(err)
	})
	
	//3.发送真正的网络请求
	 return instance(config)

}
