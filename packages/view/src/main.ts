import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import { Message } from '@arco-design/web-vue'

import App from './App.vue'

if (true) {
  const app = createApp(App)
  Message._context = app._context

  app.mount('#app')
}
