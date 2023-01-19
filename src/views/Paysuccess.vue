<template>
	<div class="paysuccess">
		<i class="el-icon-success" style="margin-bottom: 15px;"></i>
		{{mchname}}
		<ul v-if="isdata">
			<li>订单号: <span>{{paysuccessdata.merOrderId}}</span></li>
			<li>账单描述:<span>{{paysuccessdata.orderDesc}}</span></li>
			<li>订单时间:<span>{{paysuccessdata.requestTimestamp}}</span></li>
			<li>交易金额:<span>￥{{paysuccessdata.totalAmount | totalAmount}}</span></li>
		</ul>
		<!-- <el-button  v-if="!isdata" type="primary" @click="JumpToHome">返回商家</el-button> -->
	</div>
</template>
<script>
	
	// 金额键盘
	export default{
		data(){
			return{
				mchname:JSON.parse(localStorage.getItem('umsPay')).mchName,
				paysuccessdata:{},
				isdata:false
			}
		},
		filters:{
			totalAmount(e){
				return (Number(e)/100).toFixed(2)
			}
		},
		mounted() {
		// 	let mchData ={action:'onIframeReady',displayStyle:'OFFICIAL', height: 960};
		// 　　let postData = JSON.stringify(mchData);
		// 　　window.parent.postMessage(postData,'https://payapp.weixin.qq.com');
			let initData ={action:'jumpOut',jumpOutUrl:'https://1to2to3.cn/umsH5/#/paysuccess'};
		　　let initPostData  = JSON.stringify(initData);
		　　window.parent.postMessage(initPostData ,'https://payapp.weixin.qq.com');
		
			if (this.$route.query.status=='WAIT_BUYER_PAY'){//顾客取消支付hui来时WAIT_BUYER_PAY
				this.isdata=false
				this.$router.push({
					path:'/',
					query:{
						"id":this.$route.query.id,
						"totalAmount":this.$route.query.totalAmount,
						"status":'WAIT_BUYER_PAY',
						"merOrderId":this.$route.query.merOrderId
						}
				})
			}else{
				this.isdata=true
				this.paysuccessdata=JSON.parse(localStorage.getItem("paysuccess")) 
			}
		}
	}
</script>

<style scoped>
	i{
		font-size: 30px;
		color: #008c00;
	}
	.paysuccess{
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: white;
		height: 300px;
		flex-direction: column;
		align-items: center;
	}
	ul{
		width: 80%;
		margin-top: 20px;
	}
	ul li{
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
	}
</style>