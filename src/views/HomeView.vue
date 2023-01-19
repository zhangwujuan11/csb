<template>
  <div class="pay-result">
    <div class="text">支付成功</div>
    
  </div>
</template>

<script setup>
import { onMounted } from "vue";
// 微信商家小票
const wxInit = () => {
  //初始化小票
  var initData = {
    action: "onIframeReady",
    displayStyle: "SHOW_CUSTOM_PAGE",
  };
  var initPostData = JSON.stringify(initData);
  parent.postMessage(initPostData, "https://payapp.weixin.qq.com");
};
onMounted(() => {
  wxInit();
});
//注册点击事件(去首页)
const JumpToHome = () => {
	let homePage = 'https://1to2to3.cn/umsH5/#/paysuccess?id=' + JSON.parse(localStorage.getItem('umsPay')).id
  var mchData = {
    action: "jumpOut",
    jumpOutUrl: homePage, //跳转的页面
  };
  var postData = JSON.stringify(mchData);
  parent.postMessage(postData, "https://payapp.weixin.qq.com");
};
</script>

<style lang="less" scoped>
.pay-result {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  .text {
    margin-bottom: 50px;
    font-weight: 600;
    font-size: 18px;
    color: green;
  }
}
</style>

