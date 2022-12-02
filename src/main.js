import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/assets/comm.css'

Vue.config.productionTip = false
Vue.prototype.dateTypeFormat = function(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}


const $message = options => {
  return Message({
    ...options,
    offset: 200
  });
};
//重写方法,将offset写入options
['success', 'warning', 'info', 'error'].forEach(type => {
  $message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        offset: 100
      };
    }
    options.type = type;
    return Message(options);
  };
});
//将$message挂载到this上
Vue.prototype.$message = $message;
//如果用要使用 `this.$message.closeAll()`则加上下面
Vue.prototype.$message.closeAll =Message.closeAll;


// 地图测试
// import AMap from 'vue-amap';
// Vue.use(AMap);
 
  // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 高德key
//   key: '你的key',
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Geolocation']
// })
// import VConsole from 'vconsole';
//  let vConsole = new VConsole();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
