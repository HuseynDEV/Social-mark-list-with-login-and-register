<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
    <input
      v-model="userData.username"
      type="text"
      placeholder="Kullanıcı Adı"
      class="input mb-3"
    />
    <input
      v-model="userData.password"
      type="password"
      placeholder="Şifre"
      class="input mb-3"
    />
    <button class="default-button" @click="onSubmit">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,

      <router-link
        :to="{ name: 'Register' }"
        class="text-red-900 hover:text-black"
      >
        Üye olmak istiyorum!
      </router-link>
    </span>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data () {
    return {
      userData: {
        username: null,
        password: null
      }
    }
  },

  methods: {
    onSubmit () {
      // console.log(this.userData.username)

      const password = CryptoJS.HmacSHA1(
        this.userData.password,
        this.$store.getters._saltKey
      ).toString()

      console.log(password)

      // GET /posts?title=json-server&author=typicode
      this.$axios
        .get(
          `  http://localhost:3000/users?username=${this.userData.username}&password=${password} `
        )
        .then(response => {
          if (response?.data?.length > 0) {
            console.log(response)
            this.$store.commit('setUser', response?.data[0])
            this.$router.push({name:"Home"})
          }
          else{
            alert('Ad ve ya parola duzgun deyil')
          }
          // console.log(response.data)
        })
    }
  }
}
</script>
