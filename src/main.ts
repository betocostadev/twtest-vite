import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import store from './stores'

const app = createApp(App)

app.use(store)
app.mount('#app')
