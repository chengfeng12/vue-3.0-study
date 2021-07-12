<template>
  <button @click="data.modalOpen = true">弹窗</button>
  <teleport to="body">
   <div class="dialog" v-if="data.modalOpen">
     <div class="modal-dialog" >
       <h2> 我是一个 弹窗</h2>
       <p>我跟 body 同级</p>
       <button @click="data.modalOpen = false">关闭</button>
     </div>
   </div>
  </teleport>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "Teleport",
  setup() {
    const data = reactive({
      modalOpen: false,
    })
    return {
      data
    }
  }
}
</script>

<style scoped>
.dialog {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .4);
}
.modal-dialog {
  width: 35%;
  padding: 50px;
  background-color: #fff;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}
</style>