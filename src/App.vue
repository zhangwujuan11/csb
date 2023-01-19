<template>
  <div id="app">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <router-link to="/"></router-link>
    <router-view/>
  </div>
</template>
<script>
	export default{
		mounted() {
			document.body.addEventListener('touchmove', function (e) {
			  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
			}, {passive: false}); //passive 参数不能省略，用来兼容ios和androi
		}
	}
</script>
