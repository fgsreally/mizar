import { createApp } from 'vue'
import App from './App.vue'
import VueTippy from 'vue-tippy'

import 'uno.css'

const app = createApp(App)
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
  },
)
app.mount('#app')
