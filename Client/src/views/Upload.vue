<template lang="pug">
  main
    div.container
      article
        h1 Crear nueva <strong>publicación</strong>: {{ titulo }}
        div.flex
          div.column
            image-upload(@selected="image = $event")
          div.column
            form(@submit.prevent="publish")
              input(type="text" placeholder="Título" v-model="titulo")
              input(type="text" placeholder="Tags separados por comas" v-model="tags")
              textarea(placeholder="Descripcion" v-model="descripcion")
              button(type="submit") Publicar Ahora
</template>

<script>
import api from '@/api.js'
import ImageUpload from '@/components/ImageUpload.vue'

export default {
  data() {
    return {
      titulo: '',
      tags: '',
      descripcion: '',
      image: ''
    }
  },
  methods: {
    publish() {
      const formData = new FormData()
      formData.set('title', this.titulo)
      formData.set('tags', this.tags)
      formData.set('description', this.descripcion)
      formData.set('user_id', this.$store.getters.loggedId)
      formData.append('source', this.image)

      api.post('/posts', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(result => {
        if(result.data.ok)
          this.$router.push('/')
      })
    }
  },
  components: {
    ImageUpload
  }
}
</script>

<style lang="stylus" scoped>
  main
    background #EEEEEE
    padding-top 100px
    min-height 100vh
    h1
      margin 0
      margin-bottom 30px
    article
      margin-top 30px

  div.column
    width 50%

  input
  textarea
    background-color #E8E8E8

  form
    padding-left 20px
</style>