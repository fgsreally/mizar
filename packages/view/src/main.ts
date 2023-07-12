import { render } from 'vue'

import 'uno.css'
import { getIntervalConfig } from './utils'

async function start() {
  if (import.meta.env.PROD && !getIntervalConfig())
    return
  const modules = import.meta.glob('./views/*.vue', { eager: true })

  render(h('div', {
    id: 'mizar-vue-container',
  }, {
    default: () => Object.values(modules).map(m => h((m as any).default)),
  }), document.body)
}

start()
