<template>
  <h1>{{ msg }}</h1>
  <p>data.counter is: {{ counter }}</p>
  <p>data.dobuleCounter is: {{ doubleCounter }}</p>
  <p>{{msg}}</p>
  <p ref="domP"></p>
  <teleportModal></teleportModal>
  <EmitsCom @click="myClick"></EmitsCom>
  <customComp></customComp>

  <!-- v-model -->
  <VmodelPage v-model="counterTwo"></VmodelPage>
  <!-- 与上面效果相同 -->
  <VmodelPage2 v-model:counter="counterTwo" ></VmodelPage2>

  <!-- render 函数 -->
  <renderTest v-model:counter="counterTwo">
    <template v-slot:default>title</template>
    <template v-slot:content>content</template>
  </renderTest>
  <!-- 函数式组件 -->
  <Functional level="2" test="这是一段测试的内容">这是一个动态的 h 组件</Functional>
  <!-- 异步文件 -->
<!--  <AsyncComp></AsyncComp>-->
  <AsyncComp2></AsyncComp2>
  <AsyncComp3></AsyncComp3>
</template>

<script>
import teleportModal from './Teleport.vue';
import EmitsCom from './Emits.vue';
import VmodelPage from './VmodelPage.vue';
import VmodelPage2 from './VmodelPage2.vue';
import Functional from './Functional.vue';
import Error from './Error.vue';


import {reactive, computed, onMounted, onUnmounted, ref, toRefs, watch, h, defineAsyncComponent} from "vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    teleportModal,
    EmitsCom,
    VmodelPage,
    VmodelPage2,
    Functional,
    Error,
    /* vue 2 中的异步组件 */
    // AsyncComp: () =>  import('./NextPage.vue'),
    AsyncComp2: defineAsyncComponent(() => import('./NextPage.vue')),
    AsyncComp3: defineAsyncComponent({
      loader: () => import('./NextPage.vue'),
      loadingComponent: Error,
      // 加载失败时使用的组件
      errorComponent: Error,
      // 展示加载时组件的延时时间。默认值是 200 (毫秒)
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了，
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000,
    }),
    renderTest: {
      props: {
        counter: {
          type: Number,
          default: 1
        }
      },
      render() {
        this.$slots.default();
        this.$slots.content();
        return h('div', [
            h('div', {
              onClick: () => {
                this.$emit("update:counter", this.counter + 2);
              },
              class: "blue underline"
            }, [
                h('p', `renderTest: ${this.counter}`),
                h('div', this.$slots.default()),
                h('div', this.$slots.content()),
            ])
        ])
      }
    }
  },
  methods: {
    myClick() {
      console.log("click 触发了")
    }
  },
  setup() {
    /* 也可以直接写在 setup 函数中，当业务过多时，会显得代码冗余，写在外部，也可方便代码复用 */
    const { counter, doubleCounter, counterTwo } = useCounter();
    // 设置单值
    const msg = ref("hello msg");

    /*
    * 使用元素引用 ref
    * */
    const domP = ref(null);

    /* 监听器 */
    watch(counter, (oldVal, val) => {
      let p = domP.value;
      p.textContent =  `domP value from ${val} -- oldVal ${oldVal}`;
    })
    /* 字段一定要导出，包括 ref dom 元素 */
    return {
      counter,
      doubleCounter,
      msg,
      domP,
      counterTwo
    }
  }
}
function useCounter() {
  // 创建响应式 的数据
  const data = reactive({
    counter: 0,
    doubleCounter: computed(() => data.counter * 2),
    counterTwo: 1
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
