module.exports = {
	plugins:{
		autoprefixer:{},
		"postcss-px-to-viewport":{
			viewportWidth: 375,//视窗宽度，对应的是我们设计稿的宽度
			viewportHeight:667,//视图高度，对应的是我们设计稿的高度
			unitPrecision: 5,//指定`px`转换为视窗单位值的小数位数（无法整除）
			viewportUnit: 'vw',
			minPixelValue: 1,//小于或等于1px不转换
			mediaQuery: false,//允许在媒体查询中转换
			selectorBlackList: ['tab-bar','tab-bar-item','ignore'],//指定不需要转换
		}
	}
}