<template>
	<div class="payment">
		<div class="payinfo">
			<img src="@/assets/bg.png" alt="">
		</div>
		<ul class="payshop">
			<li>{{mhaname}}</li>
			<!-- <li>
				<span>商品详情:</span>
				<span>
					测试
				</span>
			</li> -->
		</ul>
		<ul class="payemo">
			<li class="paylif">
				<span>付款金额：</span>
				<div class="paynnumm">
					￥<number :index-num="indexNum" @keyboard-input="handleKeyBoard" :numberDis="false">
					</number>元
				</div>
			</li>
			<li class="paynumt">
				付款附言：
				<el-input type="text" placeholder="60字以内" maxlength="60" v-model="tetx"></el-input>
			</li>
		</ul>

		<el-button :disabled='disbtn' type="primary" @click="gowhere">立即支付</el-button>


		<!-- 蒙城 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false"
		 :show-close="false">
			<span>请联系工作人员完善商户信息</span>
		</el-dialog>
		
		
		<!-- <iframe :src='payUrl'>  </iframe> -->
	</div>
</template>

<script>
	import {
		setsingernature,
		valuesing,
		levitas,
	} from '@/assets/api/index.js'
	import QRCode from 'qrcodejs2'
	import number from '@/components/Mykey.vue'
	export default {
		data() {
			return {
				numm: null,
				times: '',
				text: "",
				codedd: '',
				tetx: '',
				dialogVisible: false,
				mhaname: '我的商铺',
				indexNum: 0, //必填字段，为键盘索引，每个键盘必须具有唯一值
				disbtn: false,
				websock: null,
			}
		},
		components: {
			number
		},

		created() {
			//临时数据
			this.$router.push({
				path: '/',
				query: {
					id: 101112
				}
			})



			if (this.$route.query.id != undefined) {
				levitas(this.$route.query.id).then(res => {
					let shid = res.data.data
					if (shid.length == 0) {
						this.dialogVisible = true
					} else {
						localStorage.setItem("umsPay", JSON.stringify(shid[0]))
						this.mhaname = shid[0].mchName
					}
				})
			} else {
				this.dialogVisible = true
			}
			
			if(this.$route.query.mid != undefined){
				
			}
		},
		
		
		mounted() {
		},
		methods: {
			goback() {
				this.$router.back()
			},
			handleKeyBoard(value) {
				let nucolx = Number(value)
				if (nucolx > 0) {
					this.disbtn = false
				} else {
					this.disbtn = true
				}
				this.numm = nucolx

			},
			formatDate(objDate, fmt) {
				var o = {
					"M+": objDate.getMonth() + 1, //月份
					"d+": objDate.getDate(), //日
					"h+": objDate.getHours() % 12 == 0 ? 12 : objDate.getHours() % 12, //小时
					"H+": objDate.getHours(), //小时
					"m+": objDate.getMinutes(), //分
					"s+": objDate.getSeconds(), //秒
					"q+": Math.floor((objDate.getMonth() + 3) / 3), //季度
					"S": objDate.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
							.length)));
				return fmt;
			},
			//公众号加服务窗
			gowhere() {
				let code = ''
				//设置随机字符
				let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
				for (var i = 0; i < 4; i++) {
					var index = Math.floor(Math.random() * 9);
					code += random[index];
					this.codedd = code;
				}
				let year = (new Date().getFullYear()).toString();
				let month = (new Date().getMonth() + 1).toString();
				let day = (new Date().getDate()).toString();
				let hour = (new Date().getHours()).toString();
				let minute = (new Date().getMinutes()).toString();
				let seconds = (new Date().getSeconds()).toString();
				if (month.length == 1) {
					month = "0" + month
				}
				if (day.length == 1) {
					day = "0" + day
				}
				if (hour.length == 1) {
					hour = "0" + hour
				}
				if (minute.length == 1) {
					minute = "0" + minute
				}
				if (seconds.length == 1) {
					seconds = "0" + seconds
				}
				let time = year + month + day + hour + minute + this.codedd
				this.times = year + month + day + hour + minute + seconds
				// 32位随机数
				let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i",
					"j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
				]
				let num = "";
				for (var e = 0; e < 32; e++) {
					num += arr[parseInt(Math.random() * 36)];
				}

				import('@wenjingq/gen_header/gen_header.js').then((ress) => {
					let contents = {
						"mid": JSON.parse(localStorage.getItem('umsPay')).mid, //商户号需要配置,先固定
						"tid": JSON.parse(localStorage.getItem('umsPay')).tid, //终端号
						"totalAmount": this.numm * 100,
						"requestTimestamp": this.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
						"merOrderId": '14FG' + time,
						"instMid": 'QRPAYDEFAULT',
						"attachedData": '门店消费', //商户附加数据
						"notifyUrl": 'http://1.117.41.70:9003/ums/cb/notifyUrl', //支付结果通知地址
						"srcReserve": '111', //请求系统预留字段
						"orderDesc": '门店消费', //账单描述
						"platformAmount": 0,
						"originalAmount": this.numm * 100, //订单原始金额
						"returnURL":'https://1to2to3.cn/umsH5/#/?id=' + JSON.parse(localStorage.getItem('umsPay')).id//失败跳回页面
					}
					let signature = ress.Signature.get_open_form_param(
						"8a81c1be831e62880183c6537f4d1bc8",
						"31cce8efd439471b9badc07468137224",
						this.times,
						num,
						JSON.stringify(contents)
					)
					window.location.href = 'https://api-mop.chinaums.com/v1/netpay/webpay/pay?authorization=' + signature
					
				})
			},
			
			
			
			
		  // 初始化weosocket
			  initWebSocket(){ 
				if(typeof(WebSocket) === "undefined"){
				  console.log("您的浏览器不支持WebSocket")
				}else{
				  const wsurl = "ws://k8s.1to2to3.cn:31052/connect?device_id=aaa";
				  // 实例化 WebSocket
				  this.websock = new WebSocket(wsurl);
				  // 监听 WebSocket 连接
				  this.websock.onopen = this.websocketonopen;
				  // 监听 WebSocket 错误信息
				  this.websock.onerror = this.websocketonerror;
				  // 监听 WebSocket 消息
				  this.websock.onmessage = this.websocketonmessage;
				
				  this.websock.onclose = this.websocketclose;
				}
			  },
		 // 连接建立之后执行send方法发送数据
		      websocketonopen(){
		        console.log("socket连接成功")
		        let actions = {"test":"12345"};
		        this.websocketsend(JSON.stringify(actions));
		      },
		      // 连接建立失败重连
		      websocketonerror(){
		        console.log("连接错误");
		        this.initWebSocket();
		      },
		      // 数据接收
		      websocketonmessage(e){
		        const resdata = JSON.parse(e.data);
		        console.log(resdata);
		      },
		      // 数据发送
		      websocketsend(Data){
		        this.websock.send(Data);
		      },
		      // 关闭
		      websocketclose(e){
		        console.log('WebSocket 断开连接',e);
		      },	
		},
		
		
		
		 beforeMount() {
		      this.initWebSocket();
		    },
		destroyed() {
		  //离开路由之后断开 websocket 连接
		  this.websock.close(); 
		},
	}
</script>

<style scoped>
	.payment {
		background: url('../assets/icon.png') no-repeat;
		background-size: 100% 180px;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.payinfo img {
		width: 85px;
		height: 85px;
		position: absolute;
		left: calc(50% - 42.5px);
		top: 10px;
	}

	.payshop {
		width: 90%;
		background: white;
		border-radius: 4px;
		padding: 8px;
		margin-top: 60px;
	}

	.payshop li {
		padding-top: 30px;
		text-align: center;
		padding-bottom: 8px;
		border-bottom: 1px solid #ccc;
		font-size: 18px;
	}

	.payemo {
		width: 90%;
		background: white;
		border-radius: 4px;
		padding: 8px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.payemo li:first-child {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		border-bottom: 1px solid #ccc;
	}

	.payemo li:first-child input {
		/* border: 0; */
		outline: none;
		width: 40px;
	}

	/deep/.el-input__inner {
		border: none;
	}

	.paynnumm {
		display: flex;
		align-items: center;
	}

	.paylif {
		align-items: center;
	}

	.paynumt {
		padding-top: 10px;
	}
</style>
