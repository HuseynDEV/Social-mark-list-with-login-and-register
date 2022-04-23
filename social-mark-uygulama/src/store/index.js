import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate";



export default createStore({
    state: {
        user: null,
        saltKey: "cbooklike123456?"
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },

        logout(state) {
            state.user = null
        }
    }
    ,

    getters: {
        _isAuthenticated: state => state.user != null,
        _getCurrentUser(state) {
            const user = state.user
            delete user?.password

            return user
        },

        _userLikes:state=>state.user?.likes,
        _userBookmarks:state=>state.user?.bookmarks,
        _currentUserId:state=>state?.user?.id,        
        _saltKey: state => state.saltKey,
        data:state=>state.user.likes
      

    },

    plugins: [createPersistedState()]
})