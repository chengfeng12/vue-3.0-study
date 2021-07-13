<template>
  <div class="blue underline" @click="$emit('update:modelValue', modelValue + 1)">
    counter: {{ modelValue }}
  </div>
</template>

<script>
export default {
  name: "VmodelPage",
  props: {
    modelValue: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>