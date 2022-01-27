<template lang="pug">
  #app
    header#main-header(:class="{'only-logo': !details}")
      nav
        .container
          div.flex.align-center
            div.column
              h1.logo: router-link(to="/") Artgram
              form(v-if="details")
                div.search-box
                  i.las.la-search
                  input(type="text" placeholder="Buscar")
            div.column(v-if="details")
              ul.user-actions(v-if="logged")
                li: router-link(to="/upload"): i.las.la-plus-circle
                li: a(href="#"): i.las.la-user-circle
                li: a(href="#" @click="logout()"): i.las.la-sign-out-alt
              router-link(tag="button" to="/login" v-if="!logged") Crea tu galería
    router-view
</template>

<script>
export default {
  data() {
    return {
      details: true,
      logged: false
    }
  },
  created() {
    this.checkRoute(this.$route)
  },
  watch: {
    '$route'(to) {
      this.checkRoute(to)
    }
  },
  methods: {
    checkRoute(to) {
      const routes = ['/login', '/register']
      if(routes.includes(to.path))
        this.details = false
      else
        this.details = true

      if(this.$store.getters.token)
        this.logged = true
      else
        this.logged = false
    },
    logout() {
      this.$store.commit('setToken', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" src="./assets/styles/main.styl" />