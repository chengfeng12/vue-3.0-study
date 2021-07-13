import { createApp, h } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).component("customComp", {
    render() {
        return h('div', '我是全局的組件')
    }
}).mount('#app')
