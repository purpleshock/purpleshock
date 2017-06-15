<template>
  <form class="code-finder" novalidate @submit.stop.prevent>
    <label class="item-title">code</label>
    <input @input="onInput"></input>
  </form>
</template>

<script>
export default {
  props: {
    codes: Array
  },
  methods: {
    onInput (e) {
      this.$emit('suggest', {
        term: e.target.value
      })
    }
  }
}
</script>

<style scoped>
.code-finder {
  display: flex;
}

.item-title {
  text-transform: uppercase;
}
</style>
