const isDev = process.env.NODE_ENV === 'development'
export default {
	baseUrl: 'http://113.44.64.84:8001', //耳标的环境
	baseApi: isDev ? '/dev-api' : '/prod-api' 
}