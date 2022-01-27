<template lang="pug">
  div.overlay(@click="close")
    div.modal(@click.stop="")
      figure
        img(:src="'http://localhost:4000/' + post.source")
      div.content
        div.top
          p
            a(href="#").author {{ user.username }}
            span.separator ·
            a(href="#") Seguir
          a(href="#" @click.prevent="close").close: i.las.la-times
        div.title
          h1 {{ post.title }}
        div.comments
          div.comment
            div.avatar
              a(href="#")
            div.text
              p <a href="#">{{ user.username }}</a> {{ post.description }} <a href="#">#tag1</a>
          div.comment(v-for="c in comments")
            div.avatar
              a(href="#")
            div.text
              p <a href="#">{{ c.username }}</a> {{ c.content }}
        div.footer
          div.likes
            a(href="#")
              i.lar.la-heart 
              span {{ post.likes }} Me gusta
          form(@submit.prevent="newComment")
            input(type="text" placeholder="Escribe tu comentario..." v-model="comment.content")
            button Publicar

</template>

<script>
import api from '@/api.js'
export default {
  props: ["id"],
  data() {
    return {
      post: {},
      user: {},
      comments: [],
      comment: {
        userId: null,
        postId: null,
        username: null,
        content: ""
      }
    }
  },
  created() {
    this.comment.userId = this.$store.getters.loggedId
    this.comment.postId = this.id
    this.comment.username = this.$store.getters.username

    api.get(`/posts/${this.id}`).then(response => {
      this.post = response.data
      return api.get(`/users/${this.post.user_id}`)
    }).then(user => {
      this.user = user.data
      return api.get(`/posts/${this.id}/comments`)
    }).then(comments => {
      this.comments = comments.data
    })
  },
  methods: {
    close() {
      this.$router.push('/')
    },
    newComment() {
      api.post(`/posts/${this.id}/comments`, this.comment).then(response => {
        if(response.data.ok) {
          const newC = Object.assign({}, this.comment)
          this.comments.push(newC)
          this.comment.content = ""
        }
      })
    }
  }
}
</script>

<style lang="stylus">

div.overlay
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
  background rgba(0,0,0,0.5)
  z-index 150
  display flex
  justify-content center
  align-items center
  div.modal
    background white
    width 90%
    height 80%
    border-radius 18px
    box-shadow 0 0 35px 0 rgba(0,0,0,0.2)
    display flex
    figure
      margin 0
      width 50%
      img
        object-fit cover
        width 100%
        height 100%
    div.content
      width 50%
      display flex
      flex-direction column
      div.top
        display flex
        justify-content space-between
        align-items center
        padding 0 20px
        flex 75px 0 0
        border-bottom 1px solid #DFDFDF
        .close
          font-size 30px
        .separator
          margin 0 10px
        .author
          color black
      div.title
        flex 75px 0 0
        margin-bottom 20px
        h1
          padding 0 20px
          line-height 75px
          margin 0
      div.footer
        padding 0 20px
        div.likes
          height 50px
          line-height 50px
          i
            font-size 20px
            margin-right 10px
          a
            font-weight bold
        form
          display flex
          button
            width initial
            margin-left 20px


div.comments
  flex 1
  overflow-y scroll

div.comment
  display flex
  padding 0 20px
  margin-bottom 30px
  .avatar
    margin-right 20px
    
    a
      display block
      width 40px
      height 40px
      background #EBEBEB
      border-radius 20px
  .text
    p
      margin 0

</style>