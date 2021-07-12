<template>
  <h1>{{ msg }}</h1>
  <p>data.counter is: {{ counter }}</p>
  <p>data.dobuleCounter is: {{ doubleCounter }}</p>
  <p>{{msg}}</p>
  <p ref="domP"></p>
  <teleportModal></teleportModal>
</template>

<script>
import teleportModal from './Teleport.vue'
import {reactive, computed, onMounted, onUnmounted, ref, toRefs, watch} from "vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    teleportModal
  },
  setup() {
    /* 也可以直接写在 setup 函数中，当业务过多时，会显得代码冗余，写在外部，也可方便代码复用 */
    const { counter, doubleCounter } = useCounter();

    // 设置单值
    const msg = ref("hello msg");

    /*
    * 使用元素引用 ref
    * */
    const domP = ref(null);

    /* 监听器 */
    watch(counter, (val, oldVal) => {
      let p = domP.value;
      p.textContent =  `domP value from ${val} -- oldVal ${oldVal}`;
    })
    /* 字段一定要导出，包括 ref dom 元素 */
    return {
      counter,
      doubleCounter,
      msg,
      domP
    }
  }
}
function useCounter() {
  // 创建响应式 的数据
  const data = reactive({
    counter: 0,
    doubleCounter: computed(() => data.counter * 2)
  });

  let timer;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000)
  });
  onUnmounted(() => {
    clearInterval(timer);
  })
  /* toRefs 转为单一值 */
  return toRefs(data);
}
</script>
