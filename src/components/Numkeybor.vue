<template>
	<div class="cuskeyboard" :style="{display:cssStyle}">
		<div class="keyboardcon">
			<div class="number">
				<div :class="active==index?'numberitem changecolor':'numberitem'" v-for="(item,index) in lists"
					:key="index" @click="choosekey(item,index)">
					<span v-if="!item.img" :class="index==lists.length-1?'numspan textspan':'numspan'">
						{{item.label}}
					</span>
					<img  v-if="item.img" :src="item.img" alt="">
				</div>
			</div>
			<div class="operate">
				<div :class="active==-1?'operateitem changecolor':'operateitem'" @click="rebacking">
					<span class="raback"></span>
				</div>
				<!-- <div class="operateitem sureitem" @click="makesure">
					<span class="flexcenter">下一步</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cuskeyboard',
		data() {
			return {
				lists: [{
					value: 1,
					label: '1'
				}, {
					value: 2,
					label: '2'
				}, {
					value: 3,
					label: '3'
				}, {
					value: 4,
					label: '4'
				}, {
					value: 5,
					label: '5'
				}, {
					value: 6,
					label: '6'
				}, {
					value: 7,
					label: '7'
				}, {
					value: 8,
					label: '8'
				}, {
					value: 9,
					label: '9'
				}, {
					value: 10,
					label: '0'
				}, {
					value: 11,
					label:'.',
					img:require('@/assets/dian.png')
				}],
				num: [],
				isEnd: false,
				cssStyle:"none",
				active: null,
			}
		},
		props: ['value', 'end', 'pattern', 'type'],
		computed: {},
		watch: {
			value(val) {
				console.log(this.value)
				this.init();
			},
			end(val) {
				this.init();
			},
			pattern(val) {
				this.init();
			},
			type(val) {}
			
		},
		methods: {
			// 拿到点击的那个键的值
			choosekey(item, index) {
				let _this = this;
				_this.active = index;
				setTimeout(() => {
					_this.active = null;
				}, 100);
				if (item.value == 12) {
					_this.$emit('closekeyboard', _this.num);
				} else {
					if (_this.type) {
						if (item.value != 10) {
							_this.num.push(item.label);
							if (!_this.checkNum()) {
								let arr = _this.num;
								let len = arr.length;
								arr.splice(len - 1, 1);
								_this.num = arr;
								return;
							}
							_this.$emit('changekey', _this.num);
						}
					} else {
						if (_this.num.length < 6) { // 这里的 6 表示最多能输入6位数
							_this.num.push(item.label);
						}
						//   console.log('this.num--->',this.num)
						if (!_this.checkNum()) {
							let arr = _this.num;
							let len = arr.length;
							arr.splice(len - 1, 1);
							_this.num = arr;
							return;
						}
						_this.$emit('changekey', _this.num);
					}
				}
			},
			checkNum() {
				//正常数字校验
				let str = /^(\-)?\d+(\.\d{1,3})?$/;
				let number = (this.num.join('')) + '0';
				let status = true;
				status = str.test(number);
				// console.log('checkNume', status);
				return status;
			},
			//初始化
			init() {
				if (this.value) {
					let value = this.value.toString();
					this.num = value.split('');
				} else {
					this.num = [];
				}
				this.isEnd = this.end;
				this.cssStyle = this.pattern;
			},
			rebacking() {
				//截取数组最后一位
				if (this.num.length > 0) {
					let num = this.num.filter(function(ele, idx, arr) {
						return arr.length - 1 !== idx;
					});
					this.num = num;
				} else {
					this.num = [];
				}
				this.$emit('changekey', this.num);
			},
			// 确定
			makesure() {
				event.stopPropagation();
				this.$emit('makesure', this.num);
			}
		},
		mounted() {}
	}
</script>

<style scoped>
	.cuskeyboard {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		max-height: 28%;
	}

	.cuskeyboard .keyboardcon {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
	}

	.cuskeyboard .keyboardcon .number {
		width: 75%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.cuskeyboard .keyboardcon .number .numberitem {
		height: 3rem;
		box-sizing: border-box;
		border-top: 4px solid #F4F4F4;
		border-right: 4px solid #F4F4F4;
		width: 33.3%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(1) {
		border-top: 7px solid #F4F4F4;
		border-left: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(2) {
		border-top: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(3) {
		border-top: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(4) {
		border-left: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(7) {
		border-left: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(10) {
		width: 66.6%;
		border-bottom: 7px solid #F4F4F4;
		border-left: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem:nth-of-type(11) {
		border-bottom: 7px solid #F4F4F4;
	}

	.cuskeyboard .keyboardcon .number .numberitem .numspan {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22px;
	}

	.cuskeyboard .keyboardcon .number .numberitem .textspan {
		font-size: 0.768rem;
	}

	.cuskeyboard .keyboardcon .operate {
		width: 25%;
	}

	.cuskeyboard .keyboardcon .operate .operateitem {
		width: 100%;
		height:100%;
		box-sizing: border-box;
		border-top: 7px solid #F4F4F4;
		border-right: 7px solid #F4F4F4;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cuskeyboard .keyboardcon .operate .operateitem .raback {
		background: url("@/assets/Icon-fill-circlearrow-left.png") no-repeat center center;
		background-size: 100%;
		width: 1.152rem;
		height:2.64533333rem;
		display: block;
		display: flex;
		
	}

	.cuskeyboard .keyboardcon .operate .operateitem .raback {
		height:2.64533333rem;
	}

	.cuskeyboard .keyboardcon .operate .nextitem {
		background: #F79825;
		border: none;
	}

	.cuskeyboard .keyboardcon .operate .sureitem {
		background: #5DABF3;
		border-top: 4px solid #F4F4F4;
		border-right: 7px solid #F4F4F4;
		border-bottom: 7px solid #F4F4F4;
		height: 8.064rem;
	}

	.cuskeyboard .keyboardcon .operate .flexcenter {
		color: #ffffff;
		font-size: 0.768rem;
	}


	.changecolor {
		background-color: #D7D7D7;
	}
</style>
