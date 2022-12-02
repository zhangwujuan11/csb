<template>
	<div class="bodbox">
      <vue-qr v-if="!sshoww" :logoSrc="imageUrl" :text="qrurl" :size="300"></vue-qr>
		<el-dialog
		  title="商户信息"
		  :visible.sync="sshoww"
		  width="90%"
		  :close-on-click-modal="false"
		  :show-close="false"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="商户名称" prop="mchName">
			    <el-input  v-model="ruleForm.mchName"></el-input>
			  </el-form-item>
			  <el-form-item label="商户ID" prop="id">
			    <el-input v-model="ruleForm.id"></el-input>
			  </el-form-item>
		    <el-form-item label="商户号" prop="mid">
		      <el-input v-model="ruleForm.mid"></el-input>
		    </el-form-item>
			<el-form-item label="终端号" prop="tid">
			  <el-input v-model="ruleForm.tid"></el-input>
			</el-form-item>
			<el-form-item label="音响ID组" prop="deviceIds">
			  <el-input v-model="ruleForm.deviceIds"></el-input>
			</el-form-item>
		    <el-form-item>
		      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    </el-form-item>
		  </el-form>
		</el-dialog>
	</div>
	
</template>

<script>
	import {levitas,levcreat} from '@/assets/api/index.js'
	import QRCode from 'qrcodejs2'
	import vueQr from 'vue-qr'
	export default{
		
			data() {
				return {
					sshoww:true,
					imageUrl: require("@/assets/logo.png"),
					qrurl:'',
					ruleForm: {
						mid:'',
						tid:'',
						mchName:'',
						id:'',
						deviceIds:''
					},
				  rules: {
						  mid: [
							{ required: true, message: '请输入商户号', trigger: 'blur' },
						  ],
						  tid: [
							{ required: true, message: '请输入终端号', trigger: 'blur' }
						  ],
						  mchName:[
							  { required: true, message: '请输入商户名称', trigger: 'blur' }
						  ],
						  id:[
						  		{ required: true, message: '请输入商户id', trigger: 'blur' }
						  ]
						},
				}
			},
			components: {
			      vueQr
			    },
		methods:{
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
			            levcreat(this.ruleForm).then(res=>{
							this.$message.success('商户信息储存成功')
							this.sshoww=false
							this.qrurl='https://1to2to3.cn/umsH5/#/?id=' + this.ruleForm.id
						}).catch(err=>{
							this.$message.error(err.response.data.error)
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
	.qrcode{
	  display:inline-block;
	  position:relative;
	  margin-top: .2rem;
	}
	.logoimg{
	    position:absolute;
	    left:50%;
	    top:50%;
	    width:60px;
	    height:60px;
	    margin-top:-30px;
	    margin-left:-30px;
	}
	.bodbox{
		width: 100%;
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
</style>