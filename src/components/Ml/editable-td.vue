<template>
  <td contenteditable="true" @input="update"></td>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['content'],
  mounted: function () {
    this.$el.innerText = this.content
  },
  methods: {
    update: function (event) {
      this.$emit('update', event.target.innerText)
    }
  }
}
</script>
