import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'uno.css'
import './assets/main.css'
import Toasted from '@hoppscotch/vue-toasted'
import '@hoppscotch/vue-toasted/style.css'

const app = createApp(App)

app.use(router).use(Toasted)

app.mount('#app')
