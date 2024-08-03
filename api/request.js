import config from '@/config/index.js'
import errorCode from '@/utils/errorCode'
import {
	$showModal,
	$showToast
} from '@/utils/index.js'
import {
	getToken
} from '@/utils/auth'
// 是否显示重新登录
export let isRelogin = {
	show: false
};
import {
	useUserStore
} from '@/stores/index.js'

/**
 * 创建request请求
 * @returns
 */
const request = (options) => {
	let {
		method,
		url,
		headers
	} = options
	method = options.method.toUpperCase()
	let data = method === 'GET' ? options.params : options.data
	url = config.baseUrl + url
	headers = Object.assign({
		'Content-Type': 'application/json;charset=utf-8'
	}, headers)
	// 是否需要设置 token
	const isToken = headers.isToken === false
	if (getToken() && !isToken) {
		headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	if (data) {
		// 清除无用参数
		Object.keys(data).forEach(key => {
			if (data[key] === null || data[key] === undefined || data[key] === '') {
				delete(data[key]);
			}
		})
	}
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中'
		});
		uni.request({
			url,
			method,
			data,
			header: headers,
			success(res) {
				if (res.statusCode === 200) {
					const code = res.data.code || 200;
					// 获取错误信息
					const msg = errorCode[code] || res.data.msg || errorCode['default']
					if (code === 401) {
						if (!isRelogin.show) {
							isRelogin.show = true;
							$showModal({
								title: '提示',
								content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
								confirm: function() {
									isRelogin.show = false;
									const userStore = useUserStore()
									userStore.LogOut().then(() => {
										uni.reLaunch({
											url: '/pages/login/login'
										})
									})
								},
								cancel: function() {
									isRelogin.show = false;
								}

							});
						}
						uni.hideLoading();
						return reject("无效的会话，或者会话已过期，请重新登录。");
					} else if (code === 500) {
						$showToast(msg)
						uni.hideLoading();
						return reject(new Error(msg));
					} else if (code === 601) {
						$showToast(msg)
						uni.hideLoading();
						return reject("error");
					} else if (code !== 200) {
						$showToast(msg)
						uni.hideLoading();
						return reject("error");
					} else {
						uni.hideLoading();
						return resolve(res.data);
					}
				} else {
					uni.hideLoading();
					$showToast('网络请求异常')
					reject(res.data)
				}
			},
			fail(err) {
				uni.hideLoading();
				$showToast('网络请求异常')
				reject(err)
			}
		})
	})
}

export default request