import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "./store/index.js"

Vue.use(VueRouter)
function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
if(localStorage.getItem('user-token'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next('/login'); // go to '/login';
 }
}
let router=new VueRouter({
    mode: "history",
    // base: process.env.VUE_APP_BASE_URL,
    routes: [
      {
        path: "/registration",
        name: "register",
        component: () => import("./views/Auth/Register.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("./views/Auth/Login.vue"),
      },
      {
        path: "/activate/:id",
        name: "activate",
        component: () => import("./views/Auth/Activate.vue"),
      },
      {
        path: "/chat",
        name: "chat",
        beforeEnter : guardMyroute,
        component: () => import("./views/chat.vue"),
      }
    ]
})
export default router;