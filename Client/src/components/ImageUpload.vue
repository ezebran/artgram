<template lang="pug">
  div
    input(id="imageFile" type="file" @change="selectFile($event)")
    label(for="imageFile" @dragenter.stop.prevent="" @dragover.stop.prevent="" @drop="loadImage($event)")
      h2(v-if="!image") Arrastra una imagen
      i.las.la-cloud-upload-alt
    img(v-if="image" :src="image")
</template>

<script>
export default {
  data() {
    return {
      image: ""
    }
  },
  mounted() {
    const width = this.$el.clientWidth
    this.$el.style.height = width + "px"
  },
  methods: {
    loadImage(e) {
      e.stopPropagation()
      e.preventDefault()
      
      const transfer = e.dataTransfer
      const files = transfer.files
      const image = files[0]
      
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        this.image = reader.result
        this.$emit("selected", image)
      })

      if(image) {
        reader.readAsDataURL(image)
        
      }
    },
    selectFile(e) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        this.image = reader.result
      })

      if(e.target.files) {
        reader.readAsDataURL(e.target.files[0])
        this.$emit("selected", e.target.files[0])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

div
  width 100%
  background transparent
  border 2px dashed #C1C1C1
  margin 10px 0
  display flex
  justify-content center
  align-items center
  position relative
  h2
    text-align center
    color rgba(0,0,0,0.2)
    user-select none
  label
    width 100%
    height 100%
    position absolute
    display flex
    align-items center
    justify-content center
    i
      font-size 230px
      position absolute
      z-index 0
      opacity 0.05
  img
    width 100%
    height 100%
    object-fit cover
    pointer-events none

input
  position absolute
  top -9999px
  left -9999px
</style>