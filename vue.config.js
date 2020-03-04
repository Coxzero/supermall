module.exports = {
	configureWebpack: {
		resolve: {
			alias: {//别名
				'assets': '@/assets' ,
				'common': '@/common' ,
				'network': '@/network',
				'assets': '@/assets',
				'views': '@/views'
			}
		}
	}
}