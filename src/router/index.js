import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import CreateBlog from '../views/CreateBlog.vue'
import UpdatePassword from '../views/UpdatePassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/register", name: "Register", component: Register },
    { path: "/login", name: "Login", component: Login },
    { path: "/reset-password", name: "ResetPassword", component: ResetPassword },
    { path: "/create-blog", name: "CreateBlog", component: CreateBlog },
    { path: "/update-password", name: "UpdatePassword", component: UpdatePassword }


  ]
})

export default router
