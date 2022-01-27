<template lang="pug">
  main
    h1 Mi Perfil
    p {{ email }}
    button(@click="logout") Salir
</template>

<script>
import api from '@/api.js'

export default {
  data() {
    return {
      email: null
    }
  },
  created() {
    api.get('/users/profile').then(response => {
      this.email = response.data.email
    })
  },
  methods: {
    logout() {
      this.$store.commit('setToken', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>