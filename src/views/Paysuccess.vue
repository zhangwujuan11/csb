<template>
	<div class="paysuccess">
		<i class="el-icon-success"></i>
		{{mchname}}
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mchname:JSON.parse(localStorage.getItem('umsPay')).mchName,
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
</style>