
/**
 * 获取本地图
 * @param folder // 文件夹名字 如 /static/images/home
 * @param fileName // 文件名 如 home-bg
 * @param format // 文件类型 如 png jpg
 * @returns {*|string}
 */


export const urlTobase64 = (folder, fileName, format = "png") => {
	let img = `/static/images/${folder}/${fileName}.${format}`
	// #ifdef MP-WEIXIN
	let imgBase64 = wx.getFileSystemManager().readFileSync(img, "base64"),
		base64Url = `data:image/png;base64,${imgBase64}`;
	return base64Url;
	// #endif
	return img
};


/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}


/**
 * 判断是否为空
 * @param val 数据
 */
export const validateNull = (val) => {
	if (typeof val === 'boolean') {
		return false;
	}
	if (typeof val === 'number') {
		return false;
	}
	if (val instanceof Array) {
		if (val.length === 0) return true;
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === '{}') return true;
	} else {
		if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
		return false;
	}
	return false;
};



/**
 * uni.showModal二次封装
 * 
 */

export const $showModal = ({
	title,
	content,
	showCancel = true,
	confirm,
	cancel
}) => {
	uni.showModal({
		title,
		content,
		showCancel,
		cancelColor: '#0FAD70',
		confirmColor: '#000000',
		confirmText: '取消',
		cancelText: '确认',
		success: function(res) {
			if (res.confirm) {
				// 取消（解决安卓端确认在左边的问题）
				cancel && cancel()
			} else if (res.cancel) {
				// 确认（解决安卓端确认在左边的问题）
				confirm && confirm()
			}
		}
	});
}


/**
 * uni.showToast二次封装
 * 
 */

export const $showToast = (title, icon = 'none') => {
	uni.showToast({
		title,
		icon,
	});
}