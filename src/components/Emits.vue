<template>
  <div style="margin-top: 20px">
    <button @click="onClick">原生事件</button>
  </div>
</template>

<script>
export default {
  name: "Emits.vue",
  // emits: ['click'], // 为了防止与原生事件重名，造成两次触发，如果不同名，则不会触发
  methods: {
    onClick() {
      this.$emit('click');
    }
  },
}
</script>

<style scoped>

</style>