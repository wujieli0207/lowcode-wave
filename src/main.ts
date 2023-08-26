import './styles/index.scss'
import 'element-plus/dist/index.css' // 完整引入 element 样式待优化

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupPinia } from './stores'
import { setupElementPlus } from './plugins'

const app = createApp(App)

app.use(router)

setupPinia(app)
setupElementPlus(app)

app.mount('#app')
