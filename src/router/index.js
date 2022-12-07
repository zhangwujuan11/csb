import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/new_file.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
	  path:'/payment',
	  name:'payment',
	  component:()=>import('@/views/Payment.vue')
  },{
	  path:'/nesindex',
	  name:'nesindex',
	  component:()=>import('@/views/Table.vue')
  },
  {
  	  path:'/reset',
  	  name:'reset',
  	  component:()=>import('@/views/Reset.vue')
  },{
	  path:'/paysuccess',
	  name:'paysuccess',
	   component:()=>import('@/views/Paysuccess.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
