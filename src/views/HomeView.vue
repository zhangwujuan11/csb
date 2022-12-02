<template>
	<div class="home">
		<h4>请选择付款方式</h4>
		<div style="margin-top: 20px">
			<el-radio-group v-model="radio" size="mini">
				<!-- <el-radio label="1" border>银联</el-radio> -->
				<el-radio label="2" border>公众号-银联</el-radio>
				<!-- <el-radio label="2" border>备选项2</el-radio>
				<el-radio label="3" border>备选项2</el-radio>
				<el-radio label="4" border>备选项2</el-radio>
				<el-radio label="5" border>备选项2</el-radio> -->
			</el-radio-group>
		</div>
		<div class="btnbox">
			<el-button type="primary" @click="sendmode">确定</el-button>
		</div>
		
		
		<!-- 蒙城 -->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="80%"
		  :close-on-click-modal="false"
		  :show-close="false"
		  >
		  <span>扫码信息出错!</span>
		</el-dialog>
		
		
		
		
	</div>
</template>

<script>
	import {levitas,levcreat} from '@/assets/api/index.js'

	export default {
		data() {
			return {
				radio: '1',
				shid:[],
				dialogVisible: false,
				sshoww:false,
				ruleForm: {
					mid:'',
					tid:''
				},
			  rules: {
					  mid: [
						{ required: true, message: '请输入商户号', trigger: 'blur' },
					  ],
					  tid: [
						{ required: true, message: '请输入终端号', trigger: 'blur' }
					  ],
					},
			 getSocketData: null,
			 url: 'ws://10.10.10.119:12345/connect'
			}
		},
		created() {
			this.$router.push({
				path:'/',
				query:{id:101112}
			})
			
			// this.init();
			
			
			
			
			// console.log(this.$route.query.id)
			if(this.$route.query.id != undefined){
				levitas(this.$route.query.id).then(res=>{
					let shid=res.data.data
					if(shid.length == 0){
						this.$alert('请先填写商户信息', {
						          confirmButtonText: '确定',
						          callback: action => {
						            this.sshoww=true
						          }
						        });
					}else{
						localStorage.setItem("umsPay",JSON.stringify(shid[0]) )
					}
				})
			}else{
				 this.dialogVisible=true
			}
		},
		
		
		// destroyed() {
		// 	//移除监听器
		//     document.removeEventListener("scroll", this.handleScroll, true);
		//     window.removeEventListener("resize", this.setNavLeft);
		// },
		methods:{
			//ws
			 // init() {
			 //      //页面初始化的时候开启WebSocket
			 //      createSocket(this.url);
			 //      // 创建接收消息函数
			 //      this.getSocketData = e => {
			 //       const data = e && e.detail.data
			 //       //这边编写处理服务端消息代码
			 //      }
			 //      //注册监听事件
			 //      window.addEventListener('onmessageWS', this.getSocketData)
			 //     },
			
			
			
			sendmode(){
				if(this.radio == "1"){
					this.$router.push('/payment')
				}else{
					this.$router.push('/nesindex')
				}
			},
			formatDate(objDate,fmt){
			　　var o = {
			　　　　"M+" : objDate.getMonth()+1, //月份
			　　　　"d+" : objDate.getDate(), //日
			　　　　"h+" : objDate.getHours()%12 == 0 ? 12 : objDate.getHours()%12, //小时
			　　　　"H+" : objDate.getHours(), //小时
			　　　　"m+" : objDate.getMinutes(), //分
			　　　　"s+" : objDate.getSeconds(), //秒
			　　　　"q+" : Math.floor((objDate.getMonth()+3)/3), //季度
			　　　　"S" : objDate.getMilliseconds() //毫秒
			　　};
			　　if(/(y+)/.test(fmt))
			　　　　fmt=fmt.replace(RegExp.$1, (objDate.getFullYear()+"").substr(4 - RegExp.$1.length));
			　　for(var k in o)
			　　　　if(new RegExp("("+ k +")").test(fmt))
			　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			　　return fmt;
			},
			
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
						  this.ruleForm.createTime=this.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss")
						  this.ruleForm.id=this.$route.query.id
			            levcreat(this.ruleForm).then(res=>{
							this.$messages.success('商户信息储存成功')
							this.sshoww=false
						})
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			      }
		}
	}
</script>
<style>
	h4{
		width: 100%;
		text-align: center;
	}
	.btnbox{
		width: 100%;
		margin-top: 2.5rem;
		display: flex;
		justify-content: center;
	}
	.el-radio.is-bordered{
		background-color: white;
	}
</style>
