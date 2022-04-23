import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "./assets/style.css"
import appHeader from "./components/Shared/appHeader"
// import SideBar from "@/components/Home/SideBar"
import appBookMarkList from "./components/Shared/appBookMark/IndexItem"
import axios from "axios"
import store from "./store"


// app.component("SideBar", SideBar)

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.use(store)
app.component("appHeader", appHeader)
app.component("appBookMarkList", appBookMarkList)
app.mount('#app')
