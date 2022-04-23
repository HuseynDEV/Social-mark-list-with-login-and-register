<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input
      v-model="userData.username"
      type="text"
      placeholder="Tam Ad"
      class="input mb-3"
    />
    <input
      v-model="userData.fullname"
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
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,

      <router-link
        :to="{ name: 'Login' }"
        class="text-red-900 hover:text-black"
      >
        Giriş yap!
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
        fullname: null,
        password: null
      }
    }
  },

  methods: {
    onSave () {
      const password =this.userData.password
      const cryptoPassword=CryptoJS.HmacSHA1(password, this.$store.getters._saltKey).toString()

      // console.log(cryptePassword)
      
       this.$axios.post(' http://localhost:3000/users', {...this.userData, password:cryptoPassword})
        .then(response => {
          console.log(response)
        })

        this.$router.push('/')
    }
  }
}
</script>
