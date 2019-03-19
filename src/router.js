import Vue from 'vue'
import Router from 'vue-router'
import Falcon from './components/Falcon.vue'
import FalconList from "./components/FalconList";

Vue.use(Router);

export default new Router({
  mode:'history',
  base:process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/ships',
    },
    {
      path:'/ships',
      name:'falcons',
      component:FalconList,
      props:(route) => ({falcon: route.query.search})
    },
    {
      path:'/ships/:id',
      props:true,
      name:'falcon',
      component:Falcon
    },

  ]
})
