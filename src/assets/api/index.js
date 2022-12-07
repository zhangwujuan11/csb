import axios from 'axios'


// 动态二维码
export function payment(data) {
	return axios({
		url: 'https://api-mop.chinaums.com/v1/netpay/bills/get-qrcode',
		method: 'post',
		data: data.body,
		headers: {
			'Authorization': data.header
		}
	})
}



// 公众号加服务窗
//存singnature
export function setsingernature(data) {
	return axios({
		url: 'https://1to2to3.cn/coupon_java/mergerPay/id',
		method: 'post',
		data
	})
}
//取value 银联支付
export function valuesing(data) {
	return axios({
		url: 'https://1to2to3.cn/coupon_java/mergerPay/id/value',
		method: 'get',
		params: {
			'id': data
		}
	})
}


// levitas
export function levitas(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"id": data
						}
					}]
				}

			}
		}
	})
}

export function levcreat(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"data": [data]
		}
	})
}

export function resetlevtas(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/set',
		method:'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			 "id": data.id,
			"data": data
		}
	})
}



// 公众号urlget
// export function urlget(data){
// 	return axios({
// 		url:data,
// 		method:'get'
// 	})
// }
// export function postArticle (data){
//     return new Promise((resolve) => {
//   axios({
//    url: data,
//    method: "get",
//    success: res=>{
//     resolve(res.data)
//    }
//   })
//     })
// }


// gid   id
export function gidid(data){
	return axios({
		url:'https://1to2to3.cn/quake-gid/global_id/id',
		method:'post',
		data
	})
}