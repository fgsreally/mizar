import './assets/main.css'
import { injectToVue3, defaultPlugins, monitor } from 'mizar-monitor'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
monitor({
    plugins: defaultPlugins,
    project: 'test',
    url: 'localhost:4448',
  
  })
  injectToVue3(app)

app.use(router)

app.mount('#app')
