<template>
  <appHeader />

  <div class="flex flex-row">
    <SideBar @category-changed="updateBookmarkList" />

    <appBookMarkList v-if="bookmarkList.length>0" :items="bookmarkList" />
      <div v-else>Henuz bir sey yok</div>
  </div>
</template>

<script>

import SideBar from '../components/Home/SideBar'
export default {
  components: {
    SideBar
  },

  data () {
    return {
      bookmarkList: [],
      categoryList: []
    }
  },

  created () {
    this.$axios.get(' http://localhost:3000/bookmarks').then(bookmark_list => {
      this.bookmarkList = bookmark_list?.data || []
    })
  },

  methods: {
    updateBookmarkList (deger) {
      const url = deger
        ? `http://localhost:3000/bookmarks?categoryId=${deger}`
        : `http://localhost:3000/bookmarks`
      console.log(deger)
      this.$axios.get(url).then(bookmark_list => {
        // console.log(bookmark_list)
        this.bookmarkList = bookmark_list?.data || []
      })
    },


  }
}
</script>
