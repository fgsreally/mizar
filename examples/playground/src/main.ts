import { createApp } from 'vue'
import './style.css'
import { addVue, defaultPlugins, monitor } from 'mizar-monitor'
import App from './App.vue'
monitor({
  plugins: defaultPlugins,
  project: 'test',
  url: 'localhost:4448',

})
const app = createApp(App)
addVue(app)
app.mount('#app')
