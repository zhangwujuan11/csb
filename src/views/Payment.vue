<template>
	<!-- <div class="payment">
		<div class="payinfo">
			<img src="@/assets/bg.png" alt="">
		</div>
		<ul class="payshop">
			<li>我的店铺名</li>
			<li>
				<span>商品详情:</span>
				<span>
					测试
				</span>
			</li>
		</ul>
		<ul class="payemo">
			<li>
				<span>付款金额：</span>
				<strong>
					￥<input v-model="num" type="number">元
				</strong>
			
			</li>
			<li>
				付款附言：
				<el-input
				  type="text"
				  placeholder="60字以内"
				  maxlength="60"
				  v-model="tetx"
				></el-input>
			</li>
		</ul>
		
		<el-button  type="primary" @click="emopay">立即支付</el-button>
	</div> -->
</template>

<script>
	import {payment} from '@/assets/api/index.js'
	export default{
		data(){
			return {
				tetx:'123',
				num:1
			}
		},
		mounted() {
			let code=''
			//设置随机字符
			let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
			for (var i = 0; i < 4; i++) {
				  var index = Math.floor(Math.random() * 9);
				  code += random[index];
			}
			import('@wenjingq/gen_header/gen_header.js').then((res)=>{
				payment({
					body:{
						"instMid": "QRPAYDEFAULT",//业务类型
						"mid":JSON.parse(localStorage.getItem('umsPay')).mid,//商户号
						"notifyUrl": "http://1.117.41.70:9003/ums/cb/notifyUrl",//支付结果通知地址
						"tid": JSON.parse(localStorage.getItem('umsPay')).tid,//终端号2022-11-18 15:02:21
						"requestTimestamp":this.dateTypeFormat('YYYY-mm-dd HH:MM:SS', new Date()),
						//"billDate": this.dateTypeFormat('YYYY-mm-dd',new Date()),//账单日期
						"billDesc": this.tetx,//账单描述
						//"billNo":this.dateTypeFormat('YYYYmmddHHMM', new Date()) + code,//账单号
						//"totalAmount":this.num * 100,//交易金额
						"srcReserve":"测试"//请求系统预留字段
					},
					header:res.Signature.get_open_body_sig(
						"8a81c1be831e62880183c6537f4d1bc8",
						"31cce8efd439471b9badc07468137224",
						JSON.stringify({
							"instMid": "QRPAYDEFAULT",//业务类型
							"mid": JSON.parse(localStorage.getItem('umsPay')).mid,//商户号
							"notifyUrl": "http://1.117.41.70:9003/ums/cb/notifyUrl",//支付结果通知地址
							"tid": JSON.parse(localStorage.getItem('umsPay')).tid,//终端号
							"requestTimestamp":this.dateTypeFormat('YYYY-mm-dd HH:MM:SS', new Date()),
							//"billDate": this.dateTypeFormat('YYYY-mm-dd',new Date()),//账单日期
							"billDesc": this.tetx,//账单描述
							//"billNo":this.dateTypeFormat('YYYYmmddHHMM', new Date()) + code,//账单号
							//"totalAmount":this.num * 100,//交易金额
							"srcReserve":"测试"//请求系统预留字段
						})
					)
				}).then(ress=>{
					if(ress.status == 200){
						window.location.href=ress.data.billQRCode
					}
				})
			})
		},
		methods:{
			emopay(){
				// let code=''
				// //设置随机字符
				// let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
				// for (var i = 0; i < 4; i++) {
				// 	  var index = Math.floor(Math.random() * 9);
				// 	  code += random[index];
				// }
				// import('@wenjingq/gen_header/gen_header.js').then((res)=>{
				// 	payment({
				// 		body:{
				// 			// "appId": "10037e6f6823b20801682b6a5e5a0006",
				// 			// "appKey": "1c4e3b16066244ae9b236a09e5b312e8",
				// 			"instMid": "QRPAYDEFAULT",//业务类型
				// 			"mid": "898340149000005",//商户号
				// 			"notifyUrl": "http://1.117.41.70:9003/ums/cb/notifyUrl",//支付结果通知地址
				// 			"tid": "88880001",//终端号2022-11-18 15:02:21
				// 			"requestTimestamp":this.dateTypeFormat('YYYY-mm-dd HH:MM:SS', new Date()),
				// 			"billDate": this.dateTypeFormat('YYYY-mm-dd',new Date()),//账单日期
				// 			"billDesc": this.tetx,//账单描述
				// 			"billNo":this.dateTypeFormat('YYYYmmddHHMM', new Date()) + code,//账单号
				// 			"totalAmount":this.num * 100,//交易金额
				// 			"srcReserve":"测试"//请求系统预留字段
				// 		},
				// 		header:res.Signature.get_open_body_sig(
				// 			"10037e6f6823b20801682b6a5e5a0006",
				// 			"1c4e3b16066244ae9b236a09e5b312e8",
				// 			JSON.stringify({
				// 				"instMid": "QRPAYDEFAULT",//业务类型
				// 				"mid": "898340149000005",//商户号
				// 				"notifyUrl": "http://1.117.41.70:9003/ums/cb/notifyUrl",//支付结果通知地址
				// 				"tid": "88880001",//终端号
				// 				"requestTimestamp":this.dateTypeFormat('YYYY-mm-dd HH:MM:SS', new Date()),
				// 				"billDate": this.dateTypeFormat('YYYY-mm-dd',new Date()),//账单日期
				// 				"billDesc": this.tetx,//账单描述
				// 				"billNo":this.dateTypeFormat('YYYYmmddHHMM', new Date()) + code,//账单号
				// 				"totalAmount":this.num * 100,//交易金额
				// 				"srcReserve":"测试"//请求系统预留字段
				// 			})
				// 		)
				// 	}).then(ress=>{
				// 		if(ress.status == 200){
				// 			window.location.href=ress.data.billQRCode
				// 		}
				// 	})
				// })
			}
		}
	}
</script>

<style scoped>
	.payment{
		background: url('../assets/icon.png') no-repeat;
		background-size: 100% 180px;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.payinfo img{
		width: 85px;
		height: 85px;
		position: absolute;
		left: calc(50% - 42.5px);
		top: 10px;
	}
	.payshop{
		width: 90%;
		background: white;
		border-radius: 4px;
		padding: 8px;
		margin-top: 60px;
	}
	.payshop li:first-child{
		padding-top: 30px;
		text-align: center;
		padding-bottom: 8px;
		border-bottom: 1px solid #ccc;
		font-size: 18px;
	}
	.payshop li:last-child{
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
	}
	.payemo{
		width: 90%;
		background: white;
		border-radius: 4px;
		padding: 8px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.payemo li:first-child{
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		border-bottom: 1px solid #ccc;
	}
	.payemo li:first-child input{
		/* border: 0; */
		outline: none;
		width: 40px;
	}
	.payemo li:last-child{
		display: flex;
		justify-content:left;
		align-items: center;
	}
	.payemo li:last-child .el-input{
		width: 50%;
		
	}
	/deep/.el-input__inner{
		border: none;
	}
</style>