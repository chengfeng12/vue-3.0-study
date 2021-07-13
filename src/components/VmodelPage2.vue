<template>
  <div class="blue underline" @click="$emit('update:counter', counter + 1)">
    counter2: {{ counter }}
  </div>
</template>

<script>
export default {
  name: "VmodelPage2",
  props: {
    counter: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>