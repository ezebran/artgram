<template lang="pug">
  main
    div.container
      article
        h1 Lo más <strong>nuevo</strong>.
      div.grid
        figure(v-for="post in posts" @dblclick="likePost(post)" @click="navigate(post)")
          img(:src="'http://localhost:4000/' + post.source")
          figcaption
            ul
              li
                i(v-if="!postLikes.includes(post.post_id)").lar.la-heart
                i(v-else).las.la-heart
                span {{ post.likes }}
              //li
                i.lar.la-comments
                span 5
    router-view
</template>

<script>
import api from '@/api.js'
export default {
  data() {
    return {
      posts: [],
      postLikes: [],
      baseUrl: 'http://localhost:4000/'
    }
  },
  created() {
    api.get('/posts').then(response => {
      this.posts = response.data
    })

    api.get(`/posts/likes/${this.$store.getters.loggedId}`).then(response => {
      this.postLikes = response.data
    })
  },
  methods: {
    likePost(post) {
      if(this.postLikes.includes(post.post_id))
        return

      api.post(`/posts/like/${post.post_id}/${this.$store.getters.loggedId}`).then(response => {
        if(response.data.ok) {
          post.likes++
          this.postLikes.push(post.post_id)
        }
      })
    },
    navigate(post) {
      this.$router.push(`/post/${post.post_id}`)
    }
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
    article
      margin-top 30px
  
  div.grid
    display flex
    margin 20px 0
    flex-wrap wrap
    figure
      margin 10px
      width calc(33.3333% - 20px)
      position relative
      cursor pointer
      &:hover figcaption
        opacity 1
      img
        display block
        width 100%
      figcaption
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(0,0,0,0.7)
        display flex
        align-items center
        justify-content center
        opacity 0
        transition opacity ease-out 200ms
        ul
          margin 0
          padding 0
          display flex
          width 80%
          justify-content space-evenly
          li
            list-style none
            color white
            font-weight bold
            font-size 40px
            display flex
            align-items center
            span
              font-size 20px
              margin-left 10px
</style>