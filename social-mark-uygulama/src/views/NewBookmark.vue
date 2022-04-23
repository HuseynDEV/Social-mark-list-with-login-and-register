<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input
      v-model="userData.title"
      type="text"
      placeholder="Başlık"
      class="input mb-3"
    />
    <input
      v-model="userData.url"
      type="text"
      placeholder="URL"
      class="input mb-3"
    />
    <select v-model="userData.categoryId" class="input mb-3">
      <option disabled selected>Kategori</option>
      <option v-for="category in categoryList" :key="category.id">{{
        category.name
      }}</option>
      <!-- <option>React</option>
       <option>Vue</option>
        <option>Angular</option> -->
    </select>
    <textarea
      v-model="userData.description"
      placeholder="Açıklama"
      class="input mb-3"
      cols="30"
      rows="10"
    ></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button @click="$router.push({ name: 'Home' })" class="secondary-button">
        İptal
      </button>
      <button @click="onSave" class="default-button">Kaydet</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null
      }
    }
  },

  mounted () {
    this.$axios
      .get('  http://localhost:3000/categories')
      .then(category_response => {
        // console.log(category_response)
        this.categoryList = category_response?.data
      })
  },

  methods: {
    onSave () {
      // console.log(this.userData)
      // console.log(this._getCurrentUser)
      const saveData = {
        ...this.userData,
        userId: this._getCurrentUser?.id,
        created_at: new Date().getMinutes()
      }
      this.$axios
        .post('http://localhost:3000/bookmarks', saveData)
        .then(save_bookmarks_response => {
          console.log(save_bookmarks_response)
          Object.keys(this.userData).forEach(
            field => (this.userData[field] = null)
          )
          this.$router.push({ name: 'Home' })
        })
    }
  },

  computed: {
    ...mapGetters(['_getCurrentUser'])
  }
}
</script>
