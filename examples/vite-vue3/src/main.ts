import './assets/main.css'
import { defaultPlugins, monitor, monitorVue3 } from 'mizar-monitor'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
monitor({
  plugins: defaultPlugins,
  project: '64b64f4a8f5ebb149debc706',
  url: 'http://localhost:3699/report',

})
monitorVue3(app)

app.use(router)

app.mount('#app')
