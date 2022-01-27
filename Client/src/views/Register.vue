<template lang="pug">
  main
    section.full.flex
      div.column.image
        img(src="@/assets/img/login.jpg")
        p Illustración de Brian Miller
      div.column.flex.text
        div.content
          h1.text-center Aquí <strong>comienza</strong> tu propia <strong>galería</strong>.
          form(@submit.prevent="register")
            ValidationProvider(rules="required" v-slot="v")
              span.error(v-if="v.errors[0]") {{ v.errors[0] }}
              input(type="text" name="Nombre de usuario" placeholder="Nombre de Usuario" v-model="username" :class="{ error: v.errors[0] }")
            ValidationProvider(rules="email|required" v-slot="v")
              span.error(v-if="v.errors[0]") {{ v.errors[0] }}
              input(type="email" name="E-mail" placeholder="E-mail" v-model="email" :class="{ error: v.errors[0] }")
            ValidationProvider(v-slot="v" rules="required")
              span.error(v-if="v.errors[0]") {{ v.errors[0] }}
              input(type="password" name="Contraseña" placeholder="Contraseña" v-model="password" :class="{ error: v.errors[0] }")
            ValidationProvider(v-slot="v" rules="required")
              span.error(v-if="v.errors[0]") {{ v.errors[0] }}
              input(type="password" name="Confirmar contraseña" placeholder="Confirma tu contraseña" v-model="password2" :class="{ error: v.errors[0] }")
            button(type="submit") Registrarse
          p.text-center o si ya tienes una cuenta
          p.text-center
            router-link(to="/") Entrar con tu cuenta
        ul.social
          li: a(href="#"): i.lab.la-facebook-square
          li: a(href="#"): i.lab.la-instagram
          li: a(href="#"): i.lab.la-patreon
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import api from '@/api.js'

extend('required', {
  ...required,
  message: '{_field_} es obligatorio'
})

extend('email', {
  ...email,
  message: '{_field_} es inválido'
})

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      password2: ""
    }
  },
  components: {
    ValidationProvider
  },
  methods: {
    register() {
      if(this.password != this.password2) {
        alert("Las contraseñas no coinciden!")
        return
      }

      api.post('/users/register', {
        email: this.email,
        password: this.password,
        username: this.username
      }).then(result => {
        console.log(result.data)
        if(result.data.token) {
          this.$store.commit('setToken', result.data.token)
          this.$store.commit('setId', result.data.id)
          this.$store.commit('setUsername', result.data.username)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .image
    width 60%
    flex-basis 60%
    position relative
    img
      width 100%
      display block
      height 100%
      object-fit cove
    p
      position absolute
      bottom 30px
      left 30px
      color white
      font-weight 600
  div.text
    align-self center
    flex-basis 40%
    align-items center
    justify-content center
    div.content
      width 320px
  ul.social
    position absolute
    bottom 40px
    margin 0
    padding 0
    li
      display inline-block
      margin 0 10px
      a
        font-size 30px
        font-weight normal
  span.error
    padding 0 20px
    color #F23C3C
    font-size 10px
    font-weight bold
    margin-bottom 5px
    display block
</style>