import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'

if (window.MIZAR_SDK) {
  const app = createApp(App)

  app.mount('#app')
}
