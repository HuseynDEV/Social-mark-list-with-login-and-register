import { createRouter, createWebHashHistory } from "vue-router"
import store from "../store"

const routes = [

    {
        name: "Home",
        path: "/",
        component: () => import("../views/HomeItem")
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("../views/LoginItem")
    },
    {
        name: "Register",
        path: "/register",
        component: () => import("../views/RegisterItem")
    },
    {
        name: "NewBookMark",
        path: "/new",
        component: () => import("../views/NewBookmark")
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})



router.beforeEach((to, from, next) => {

    // const authRequiredRoutes = ['Home']
    const _isAuthenticated = store.getters._isAuthenticated
    // const authNotRequiredRoutes = ['Login', 'Register']
    // if (authRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) {
    //     next()
    // } else if (authRequiredRoutes.indexOf(to.name) > -1) {
    //     next({ name: 'Home' })
    // }
    // else {
    //     next()
    // }

    // if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false)

if((to.name=='Login' || to.name=="Register" ) && _isAuthenticated) next(false)

    if (to.name === "Home") {
        if (_isAuthenticated) next()
        else next({ name: 'Login' })
    }
    else {
        next()
    }

    console.log(to, from)
    // next()


})



export default router